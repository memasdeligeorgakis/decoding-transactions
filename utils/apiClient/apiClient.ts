import {
  Contribution,
  Validator,
  ValidatorRaw,
  ChainStats,
  Block,
  BlockQueryType,
  Transaction,
} from "./types";

import { init, decode_transactions } from "../namadaSdk";

const ATTESTATIONS_URL = (ceremonyRoundIndex: number) =>
  `https://d1237n1wgx6tbl.cloudfront.net/trusted-setup-artifacts-production/contributions_${ceremonyRoundIndex}.json`;

const TESTNET_URL = () =>
  "https://d3brk13lbhxfdb.cloudfront.net/qc-testnet-5.1.025a61165acd05e";

export class ApiClient {
  decodeTransactions = async (transactions: Uint8Array) => {
    const _initializedWasmModule = await init();
    const decodedTransactions = await decode_transactions(transactions);
    return decodedTransactions;
  };
  getContributionIfOfCeremonyRound = async (
    ceremonyRoundIndex: number
  ): Promise<Contribution[]> => {
    try {
      const response = await fetch(ATTESTATIONS_URL(ceremonyRoundIndex));
      const contributions = (await response.json()) as Contribution[];
      const dataItemsForCurrentCeremonyRound = contributions.map(
        (contribution) => {
          // if fullName is not there we place a string "anonymous"
          const fullNameOrAnonymous =
            contribution.full_name === null ||
            contribution.full_name === undefined ||
            contribution.full_name === ""
              ? "anonymous"
              : contribution.full_name;

          // we have to do slight formatting
          const formattedContribution = {
            ...contribution,
            id: `${contribution.ceremony_round}`,
            full_name: fullNameOrAnonymous,
          };

          return formattedContribution;
        }
      );
      return dataItemsForCurrentCeremonyRound;
    } catch {
      return Promise.resolve([]);
    }
  };

  getCountOfCeremonyRounds = async (): Promise<number> => {
    return 4;
  };

  getValidators = async (): Promise<Validator[]> => {
    const url = `${TESTNET_URL()}/validators`;
    const response = await fetch(url);
    const body = await response.json();

    const validatorsParsed = body as {
      result: { validators: ValidatorRaw[] };
    };

    const totalVotingPower = validatorsParsed.result.validators.reduce(
      (previous, validator) => {
        const votingPowerAsNumber = Number(validator.voting_power);
        return previous + votingPowerAsNumber;
      },
      0
    );
    const validators = validatorsParsed.result.validators.map(
      (validatorRaw) => {
        const votingPowerAsNumber = Number(validatorRaw.voting_power);
        const votingPowerPercentageFormatted =
          votingPowerAsNumber / totalVotingPower > 0.001
            ? `${((votingPowerAsNumber / totalVotingPower) * 100).toFixed(2)}`
            : `${((votingPowerAsNumber / totalVotingPower) * 100).toFixed(4)}`;
        const validator: Validator = {
          address: validatorRaw.address,
          proposerPriority: validatorRaw.proposer_priority,
          pubKey: validatorRaw.pub_key,
          votingPowerAbsolute: validatorRaw.voting_power,
          votingPowerPercentage: votingPowerPercentageFormatted,
        };
        return validator;
      }
    );

    return validators;
  };

  getChainStats = async (): Promise<ChainStats> => {
    const url = `${TESTNET_URL()}/validators`;
    const response = await fetch(url);
    const body = await response.json();
    const validatorsParsed = body as {
      result: { block_height: string; count: string; total: string };
    };

    const chainStats: ChainStats = {
      blockHeight: validatorsParsed.result.block_height,
      validatorCount: validatorsParsed.result.count,
      validatorTotalCount: validatorsParsed.result.total,
    };

    return chainStats;
  };

  getBlockByHash = async (height: string): Promise<Block> => {
    try {
      const data = await this.getBlockByHashOrHeight(
        height,
        BlockQueryType.Hash
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  getBlockByHeight = async (height: string): Promise<Block> => {
    try {
      const data = await this.getBlockByHashOrHeight(
        height,
        BlockQueryType.Height
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  private getBlockByHashOrHeight = async (
    hashOrHeight: string,
    blockQueryType: BlockQueryType
  ): Promise<Block> => {
    try {
      const urlByHash = `${TESTNET_URL()}/block_by_hash?hash=0x${hashOrHeight}`;
      const urlByHeight = `${TESTNET_URL()}/block?height=${hashOrHeight}`;
      const url =
        blockQueryType === BlockQueryType.Hash ? urlByHash : urlByHeight;
      const response = await fetch(url);
      const body = await response.json();

      const blockRaw = body as {
        result: {
          block_id: { hash: string };
          block: {
            header: {
              height: string;
              time: string;
            };
            chain_id: string;
            height: string;
            time: string;
            data: {
              txs: string[];
            };
          };
        };
      };

      // decoding transactions
      const utf8EncodedString = new TextEncoder();
      const transactionsAsByteArray = utf8EncodedString.encode(
        blockRaw.result.block.data.txs[0]
      );
      const transactions = await this.decodeTransactions(
        transactionsAsByteArray
      );

      console.log(transactions, "transactions");

      // crating the DTO to return
      const block: Block = {
        hash: blockRaw.result.block_id.hash,
        height: blockRaw.result.block.header.height,
        time: blockRaw.result.block.header.time,
        transactionsOfBlock: blockRaw.result.block.data.txs,
      };
      return block;
    } catch {
      return Promise.reject("not able to fetch block with given parameters");
    }
  };

  getTransactionByHash = async (hash: string): Promise<Transaction> => {
    try {
      const urlByHash = `${TESTNET_URL()}/tx?hash=0x${hash}`;
      const response = await fetch(urlByHash);
      const body = await response.json();
      const transactionRaw = body as {
        result: {
          hash: String;
          height: String;
          tx_result: {
            gas_used: String;
            gas_wanted: String;
            log: String;
          };
          tx: String;
        };
      };

      const transaction: Transaction = {
        hash: transactionRaw.result.hash,
        height: transactionRaw.result.height,
        transactionData: transactionRaw.result.tx,
        txResult: {
          gasUsed: transactionRaw.result.tx_result.gas_used,
          gasWanted: transactionRaw.result.tx_result.gas_wanted,
          log: transactionRaw.result.tx_result.log,
        },
      };
      return transaction;
    } catch {
      return Promise.reject("no transaction found with given hash");
    }
  };
}
