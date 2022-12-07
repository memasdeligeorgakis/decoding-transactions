import { Transaction } from "../../../utils/apiClient";

type Props = {
  transaction?: Transaction;
};
export const TransactionDetails = (props: Props) => {
  const { transaction } = props;
  return (
    <div>
      <h3>Transaction hash</h3>
      <div
        style={{
          backgroundColor: "black",
          margin: "12px 0 0",
          padding: " 4px 16px",
          borderRadius: "8px",
        }}
      >
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "pre-wrap",
          }}
        >
          {transaction?.hash}
        </pre>
      </div>

      <h3>Transaction In Block Height</h3>
      <div
        style={{
          backgroundColor: "black",
          margin: "12px 0 0",
          padding: " 4px 16px",
          borderRadius: "8px",
        }}
      >
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "pre-wrap",
          }}
        >
          {transaction?.height}
        </pre>
      </div>

      <h3>Gas Used</h3>
      <div
        style={{
          backgroundColor: "black",
          margin: "12px 0 0",
          padding: " 4px 16px",
          borderRadius: "8px",
        }}
      >
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "pre-wrap",
          }}
        >
          {transaction?.txResult.gasUsed}
        </pre>
      </div>

      <h3>Gas Wanted</h3>
      <div
        style={{
          backgroundColor: "black",
          margin: "12px 0 0",
          padding: " 4px 16px",
          borderRadius: "8px",
        }}
      >
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "pre-wrap",
          }}
        >
          {transaction?.txResult.gasWanted}
        </pre>
      </div>
    </div>
  );
};
