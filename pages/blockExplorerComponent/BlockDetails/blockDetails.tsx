import { Block } from "../../../utils/apiClient";

type Props = {
  block?: Block;
};
export const BlockDetails = (props: Props) => {
  const { block } = props;
  return (
    <div>
      <h3>Block hash</h3>
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
          {block?.hash}
        </pre>
      </div>

      <h3>Block height</h3>
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
          {block?.height}
        </pre>
      </div>

      <h3>Block time</h3>
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
          {block?.time}
        </pre>
      </div>

      <h3>Block transactions</h3>
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
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
          }}
        >
          {block?.transactionsOfBlock}
        </pre>
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
          }}
        >
          {block?.transactionsOfBlock}
        </pre>
        <pre
          style={{
            backgroundColor: "black",
            color: "white",
            whiteSpace: "break-spaces",
            wordBreak: "break-all",
          }}
        >
          {block?.transactionsOfBlock}
        </pre>
      </div>
    </div>
  );
};
