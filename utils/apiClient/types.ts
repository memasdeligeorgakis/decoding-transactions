export type Contribution = {
  id: string;
  full_name: string;
  public_key: string;
  is_another_machine: boolean;
  is_own_seed_of_randomness: boolean;
  ceremony_round: number;
  joined_cohort: number;
  contribution_hash: string;
  contribution_hash_signature: string;
  timestamps: {
    start_contribution: string;
    end_contribution: string;
  };
  attestation?: string;
};

export type ValidatorRaw = {
  address: string;
  proposer_priority: string;
  pub_key: {
    type: string;
    value: string;
  };
  voting_power: string;
};

export type Validator = {
  address: string;
  proposerPriority: string;
  pubKey: {
    type: string;
    value: string;
  };
  votingPowerAbsolute: string;
  votingPowerPercentage: string;
};

export type ChainStats = {
  blockHeight: string;
  validatorCount: string;
  validatorTotalCount: string;
};

export type Block = {
  hash: string;
  height: string;
  time: string;
  transactionsOfBlock: string[];
};

export enum BlockQueryType {
  Hash,
  Height,
}

export type Transaction = {
  hash: String;
  height: String;
  transactionData: String;
  txResult: {
    log?: String;
    gasWanted: String;
    gasUsed: String;
  };
};
