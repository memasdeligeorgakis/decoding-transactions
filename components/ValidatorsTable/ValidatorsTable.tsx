import { useState, useEffect } from "react";
import { Modal } from "../Modal";

import {
  TableContainer,
  Table,
  TableBody,
  TableHeader,
  TableHeaderForId,
  TableHeaderForName,
  AttestationDetailsContainer,
  TableData,
  TableRow,
  DownloadAnchor,
} from "./validatorsTable.components";
import { Validator } from "../../utils/apiClient";

function getWindowWidth() {
  const { innerWidth: width } = window;
  return {
    width,
  };
}

export default function useWindowWidth() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowWidth());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

// turns long strings to shorter format
// 6a62e717b7320435f1cee17e3d9cd32dbb -> 6a6...dbb
const formatLongHashStrings = (
  inputString?: string,
  charsToShow: number = 3
): string => {
  // if its less than 9 chars just return it as is
  if (inputString && inputString.length < charsToShow * 2 + 2) {
    return inputString;
  }

  const firstCharacters = inputString && inputString.substring(0, charsToShow);
  const lastCharacters = inputString && inputString.slice(-charsToShow);
  return `${firstCharacters}...${lastCharacters}`;
};

type Props = {
  contributions: Validator[];
};

const ValidatorsTableRow = (
  rowData: Validator,
  onClick: (contribution: Validator) => void
): JSX.Element => {
  return (
    <TableRow key={rowData.pubKey.value}>
      <TableData
        style={{ width: "50%" }}
        title={`Validator Address: ${rowData.address} \nPublic Key: ${rowData.pubKey.value}`}
      >
        {rowData.address}
      </TableData>
      <TableData style={{ width: "200px" }}>
        {rowData.votingPowerPercentage}% ({rowData.votingPowerAbsolute})
      </TableData>
    </TableRow>
  );
};

export const ValidatorsTable = (props: Props): JSX.Element => {
  const { contributions } = props;
  const [windowWidth, setWindowWith] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttestationModalOpen, setAttestationIsModalOpen] = useState(false);
  const [attestationModalContent, setAttestationModalContent] = useState<
    string | undefined
  >();
  const [selectedAttestationDetails, setSelectedAttestationDetails] = useState<
    Validator | undefined
  >();
  useEffect(() => {
    const { innerWidth: width } = window;
    setWindowWith(width);
  }, []);

  const onClick = (contribution: Validator) => {
    setIsModalOpen(true);
    setSelectedAttestationDetails(contribution);
  };

  const renderedRows = contributions.map((contribution) =>
    ValidatorsTableRow(contribution, onClick)
  );

  return (
    <TableContainer>
      <Modal
        isOpen={isModalOpen}
        title={`Contribution Details`}
        onBackdropClick={() => {
          setIsModalOpen(false);
        }}
      >
        <AttestationDetailsContainer>
          <h3>Validator</h3>
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
              Some details
            </pre>
          </div>
        </AttestationDetailsContainer>
      </Modal>
      <Modal
        isOpen={isAttestationModalOpen}
        title={`Attestation`}
        onBackdropClick={() => {
          setIsModalOpen(false);
        }}
      >
        <AttestationDetailsContainer>
          <h3>Attestation</h3>
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
              {attestationModalContent}
            </pre>
          </div>
        </AttestationDetailsContainer>
      </Modal>
      <Table>
        <TableRow>
          <TableHeader style={{ width: "50%" }}>Validator Address</TableHeader>
          <TableHeader style={{ width: "200px" }}>Voting Power</TableHeader>
        </TableRow>
        {renderedRows}
      </Table>
    </TableContainer>
  );
};
