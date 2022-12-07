import styled from "styled-components";

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const TableElement = styled.table`
  width: 100%;
`;
export const TableBody = styled.tbody``;
export const TableRow = styled.tr`
  height: 27px;
`;
export const TableHeader = styled.th`
  text-align: left;
`;

export const TableHeaderForId = styled(TableHeader)`
  width: 28px;
`;

export const TableHeaderForName = styled(TableHeader)`
  min-width: 200px;
`;

export const TableHeaderForPublicKey = styled(TableHeader)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media screen and (max-width: 640px) {
    width: 350px;
    max-width: 350px;
  }
`;

export const TableHeaderForAttestation = styled(TableHeader)`
  width: 28px;
`;

export const TableData = styled.td`
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableDataForId = styled(TableData)`
  width: 28px;
`;

export const TableDataForPublicKey = styled(TableData)`
  max-width: 300px;
  cursor: pointer;
  @media screen and (max-width: 640px) {
    max-width: 100px;
  }
`;

export const TableDataForName = styled(TableData)`
  width: 200px;
  max-width: 200px;
  padding: 0 8px 0 0;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AttestationDetailsContainer = styled.div`
  display: flex;
  word-wrap: break-word;
  display: inline-block;
  width: 100%;
`;

export const DownloadAnchor = styled.a`
  text-decoration: revert;
`;
