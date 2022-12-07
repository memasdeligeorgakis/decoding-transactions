import { useState, useEffect } from "react";
import { Modal } from "../Modal";

import {
  TableContainer,
  TableElement,
  TableBody,
  TableHeader,
  TableHeaderForId,
  TableHeaderForName,
  AttestationDetailsContainer,
  TableData,
  TableDataForId,
  TableDataForName,
  TableDataForPublicKey,
  TableRow,
  DownloadAnchor,
} from "./attestationTable.components";
import { Contribution } from "../../utils/apiClient";

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
  inputString: string,
  charsToShow: number = 3
): string => {
  // if its less than 9 chars just return it as is
  if (inputString.length < charsToShow * 2 + 2) {
    return inputString;
  }

  const firstCharacters = inputString.substring(0, charsToShow);
  const lastCharacters = inputString.slice(-charsToShow);
  return `${firstCharacters}...${lastCharacters}`;
};

type Props = {
  contributions: Contribution[];
};

const AttestationTableRow = (
  rowData: Contribution,
  charsToShow: number,
  onClick: (contribution: Contribution) => void
): JSX.Element => {
  return (
    <TableRow key={rowData.id}>
      <TableDataForId>{rowData.id}</TableDataForId>
      <TableDataForName>{rowData.full_name}</TableDataForName>
      <TableDataForPublicKey
        onClick={() => {
          onClick(rowData);
        }}
      >
        {formatLongHashStrings(rowData.public_key, charsToShow)}
      </TableDataForPublicKey>
      <TableDataForPublicKey
        onClick={() => {
          onClick(rowData);
        }}
      >
        {formatLongHashStrings(rowData.contribution_hash, charsToShow)}
      </TableDataForPublicKey>
      <TableDataForPublicKey
        onClick={() => {
          onClick(rowData);
        }}
      >
        {formatLongHashStrings(
          rowData.contribution_hash_signature,
          charsToShow
        )}
      </TableDataForPublicKey>
      <TableData>
        <DownloadAnchor
          href={`https://contribute.namada.net/trusted-setup-artifacts-production/round_${rowData.id}/chunk_0/contribution_1.unverified`}
        >
          Download
        </DownloadAnchor>
      </TableData>
      <TableData>
        {rowData.attestation ? (
          <DownloadAnchor href={rowData.attestation} target="_blank">
            yes
          </DownloadAnchor>
        ) : (
          <span>no</span>
        )}
      </TableData>
    </TableRow>
  );
};

export const AttestationTable = (props: Props): JSX.Element => {
  const { contributions } = props;
  const [windowWidth, setWindowWith] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttestationModalOpen, setAttestationIsModalOpen] = useState(false);
  const [attestationModalContent, setAttestationModalContent] = useState<
    string | undefined
  >();
  const [selectedAttestationDetails, setSelectedAttestationDetails] = useState<
    Contribution | undefined
  >();
  useEffect(() => {
    const { innerWidth: width } = window;
    setWindowWith(width);
  }, []);

  const onClick = (contribution: Contribution) => {
    setIsModalOpen(true);
    setSelectedAttestationDetails(contribution);
  };

  let charsToShow = 3;
  if (windowWidth < 640) {
    charsToShow = 3;
  } else if (windowWidth > 960 && windowWidth < 1240) {
    charsToShow = 5;
  } else if (windowWidth > 1240) {
    charsToShow = 9;
  }

  const renderedRows = contributions.map((contribution) =>
    AttestationTableRow(contribution, charsToShow, onClick)
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
          <h3>name</h3>
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
              {selectedAttestationDetails?.full_name}
            </pre>
          </div>

          <h3>public key</h3>
          <div
            style={{
              backgroundColor: "black",
              margin: "12px 0 0",
              padding: "4px 16px",
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
              {selectedAttestationDetails?.public_key}
            </pre>
          </div>

          <h3>contribution hash</h3>
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
              {selectedAttestationDetails?.contribution_hash}
            </pre>
          </div>

          <h3>contribution hash signature</h3>
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
              {selectedAttestationDetails?.contribution_hash_signature}
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
      <TableElement>
        <TableBody>
          <TableRow>
            <TableHeaderForId>ID</TableHeaderForId>
            <TableHeaderForName>Name</TableHeaderForName>
            <TableHeader>Public Key</TableHeader>
            <TableHeader>Hash</TableHeader>
            <TableHeader>Signature</TableHeader>
            <TableHeader>Response</TableHeader>
            <TableHeader>Attestation</TableHeader>
          </TableRow>
          {renderedRows}
        </TableBody>
      </TableElement>
    </TableContainer>
  );
};
