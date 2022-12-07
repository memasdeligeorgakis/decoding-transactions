import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { ValidatorsTable } from "../../components/ValidatorsTable";
import { Button } from "../../components/StyledComponentButton";
import { Input } from "../../components/Input";
import {
  ApiClient,
  Validator,
  ChainStats,
  Block,
  Transaction,
} from "../../utils/apiClient";
import {
  TrustedSetupContainer,
  TrustedSetupInnerContainer,
  TrustedSetupTableContainer,
  TableUtilsRow,
  TableUtilsSubRow,
  TableUtilsRowItem,
  TableContainer,
} from "./blockExplorer.components";

import { BlockDetails } from "./BlockDetails";
import { TransactionDetails } from "./TransactionDetails";

import { SelectedTable } from "./types";

const apiClient = new ApiClient();

export default function BlockExplorer() {
  const [blockHeightSearchField, setBlockHeightSearchField] = useState("");
  const [blockHashSearchField, setBlockHashSearchField] = useState("");
  const [transactionHashSearchField, setTransactionHashSearchField] =
    useState("");
  const [block, setBlock] = useState<Block | undefined>();
  const [transaction, setTransaction] = useState<Transaction | undefined>();
  const [chainStats, setChainStats] = useState<ChainStats | undefined>();
  const [validators, setValidators] = useState<Validator[]>([]);
  const [selectedTable, setSelectedTable] = useState<SelectedTable>(
    SelectedTable.Validators
  );
  useEffect(() => {
    // have to wrap to async as we need async funcs
    const loadAsyncData = async () => {
      const validators = await apiClient.getValidators();
      const fetchedChainStats = await apiClient.getChainStats();

      setValidators(validators);
      setChainStats(fetchedChainStats);
    };

    loadAsyncData();
  }, []);

  const selectTable = (selectedTable: SelectedTable) => {
    setSelectedTable(selectedTable);
  };

  const fetchBlock = async () => {
    try {
      if (blockHeightSearchField === "") {
        const fetchedBlock = await apiClient.getBlockByHash(
          blockHashSearchField
        );
        setBlock(fetchedBlock);
      } else {
        const fetchedBlock = await apiClient.getBlockByHeight(
          blockHeightSearchField
        );
        setBlock(fetchedBlock);
      }
    } catch {
      setBlock(undefined);
    }
  };

  const fetchTransaction = async () => {
    try {
      const fetchedTransaction = await apiClient.getTransactionByHash(
        transactionHashSearchField
      );
      setTransaction(fetchedTransaction);
    } catch {
      setTransaction(undefined);
    }
  };

  return (
    <TrustedSetupContainer>
      <TrustedSetupInnerContainer>
        <TrustedSetupTableContainer>
          {/* Common top row to all tables */}
          <TableUtilsRow>
            <TableUtilsRowItem>
              <h1>Namada Block Explorer</h1>
            </TableUtilsRowItem>
            <TableUtilsRowItem style={{ height: "1px" }}>
              <h4 style={{ paddingTop: "8px" }}>
                Block Height: {chainStats?.blockHeight}
              </h4>
            </TableUtilsRowItem>
            <TableUtilsRowItem style={{ height: "1px" }}>
              <h4
                style={{ paddingTop: "8px" }}
                title={`Active: ${chainStats?.validatorCount} Total: ${chainStats?.validatorTotalCount}`}
              >
                Validators: {chainStats?.validatorCount}/
                {chainStats?.validatorTotalCount}
              </h4>
            </TableUtilsRowItem>
          </TableUtilsRow>

          {/* sub row that acts as menu */}
          <TableUtilsSubRow>
            <TableUtilsRowItem>
              <Button
                selected={selectedTable === SelectedTable.Validators}
                onClick={() => selectTable(SelectedTable.Validators)}
              >
                Validators
              </Button>
            </TableUtilsRowItem>
            <TableUtilsRowItem>
              <Button
                selected={selectedTable === SelectedTable.Blocks}
                onClick={() => selectTable(SelectedTable.Blocks)}
              >
                Blocks
              </Button>
            </TableUtilsRowItem>
            <TableUtilsRowItem>
              <Button
                selected={selectedTable === SelectedTable.Transactions}
                onClick={() => selectTable(SelectedTable.Transactions)}
              >
                Transactions
              </Button>
            </TableUtilsRowItem>
          </TableUtilsSubRow>

          {/* validators */}
          {selectedTable === SelectedTable.Validators && (
            <>
              <TableUtilsSubRow>
                <TableUtilsRowItem>
                  <h2>Validators</h2>
                </TableUtilsRowItem>
              </TableUtilsSubRow>
              <TableContainer>
                <ValidatorsTable contributions={validators} />
              </TableContainer>
            </>
          )}

          {/* blocks */}
          {selectedTable === SelectedTable.Blocks && (
            <div>
              <TableUtilsSubRow>
                <TableUtilsRowItem>
                  <h2>Block</h2>
                </TableUtilsRowItem>
              </TableUtilsSubRow>
              <TableUtilsSubRow>
                <TableUtilsRowItem>
                  <Input
                    placeholder="Block height"
                    value={blockHeightSearchField}
                    onChange={(event) => {
                      setBlockHashSearchField("");
                      setBlockHeightSearchField(event.target.value);
                    }}
                  />
                </TableUtilsRowItem>
                <TableUtilsRowItem>
                  <Input
                    value={blockHashSearchField}
                    onChange={(event) => {
                      setBlockHeightSearchField("");
                      setBlockHashSearchField(event.target.value);
                    }}
                    placeholder="Block hash"
                  />
                </TableUtilsRowItem>

                <TableUtilsRowItem>
                  <Button onClick={() => fetchBlock()}>Search</Button>
                </TableUtilsRowItem>
              </TableUtilsSubRow>

              <TableContainer>
                <BlockDetails block={block} />
              </TableContainer>
            </div>
          )}

          {/* transactions */}
          {selectedTable === SelectedTable.Transactions && (
            <>
              <TableUtilsSubRow>
                <TableUtilsRowItem>
                  <h2>Transactions</h2>
                </TableUtilsRowItem>
              </TableUtilsSubRow>
              <TableUtilsSubRow>
                <TableUtilsRowItem>
                  <Input
                    value={transactionHashSearchField}
                    onChange={(event) => {
                      setTransactionHashSearchField(event.target.value);
                    }}
                    placeholder="Transaction hash"
                  />
                </TableUtilsRowItem>

                <TableUtilsRowItem>
                  <Button onClick={() => fetchTransaction()}>Search</Button>
                </TableUtilsRowItem>
              </TableUtilsSubRow>

              <TableContainer>
                <TransactionDetails transaction={transaction} />
              </TableContainer>
            </>
          )}
        </TrustedSetupTableContainer>
        <Link href="/"></Link>
      </TrustedSetupInnerContainer>
    </TrustedSetupContainer>
  );
}
