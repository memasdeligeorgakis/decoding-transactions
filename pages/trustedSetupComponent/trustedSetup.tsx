import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { AttestationTable } from "../../components/AttestationTable";
import { HeroBanner } from "../../components/HeroBanner";
import { Image, ImageName } from "../../components/Image";
import { ApiClient, Contribution } from "../../utils/apiClient";
import {
  TrustedSetupContainer,
  TrustedSetupInnerContainer,
  TrustedSetupTableContainer,
  TrustedSetupBannerContainer,
  TimeCountDownContainer,
  TimeCountDownTimeHeader,
  TimeCountDownLabelContainer,
  TimeCountDownLabelCharacterContainer,
  TimeCountDownContainerTopLabel,
  BannerNamadaLogo,
  CatImage,
  HammerImage,
  TableUtilsRow,
  CohortLabel,
  TableUtilsRowRightContainer,
  TableUtilsItemContainer,
  CeremonyRoundVerifyButton,
  TableContainer,
  FilterInput,
  SearchIconContainer,
  CeremonyRoundSelect,
  MiddleSectionOfContainerOnlyMobile,
  TimeCountDownContainerOnlyMobile,
  TimeCountDownContainerTopLabelOnlyMobile,
  TimeCountDownLabelContainerOnlyMobile,
  TimeCountDownTimeHeaderOnlyMobile,
} from "./trustedSetup.components";
import Cat from "./assets/namada_cat.png";
import Hammer from "./assets/namada_hammer.png";
import LogoInBanner from "./assets/namada_logo_in_banner.png";

const startDate = Date.UTC(2022, 10, 19, 9);
const endDate = Date.UTC(2022, 11, 21, 9);

const getUtcTimeStamp = (): number => {
  const currentTimeStamp = new Date();
  const currentTimeStampUtc = Date.UTC(
    currentTimeStamp.getUTCFullYear(),
    currentTimeStamp.getUTCMonth(),
    currentTimeStamp.getUTCDate(),
    currentTimeStamp.getUTCHours(),
    currentTimeStamp.getUTCMinutes(),
    currentTimeStamp.getUTCSeconds()
  );
  return currentTimeStampUtc;
};

const setTimeDeltaHelper = (
  setTimeDelta: Dispatch<SetStateAction<number | undefined>>
) => {
  const currentDate = new Date();
  const timeAsMilliSeconds = Math.floor(currentDate.getTime());
  const timeAsSeconds = Math.floor(timeAsMilliSeconds);
  setTimeDelta(timeAsSeconds);
};

const getFormattedTimeDelta = (): string => {
  // if (milliSeconds) {
  const currentTimeStamp = new Date();
  const currentTimeStampUtc = Date.UTC(
    currentTimeStamp.getUTCFullYear(),
    currentTimeStamp.getUTCMonth(),
    currentTimeStamp.getUTCDate(),
    currentTimeStamp.getUTCHours(),
    currentTimeStamp.getUTCMinutes(),
    currentTimeStamp.getUTCSeconds()
  );
  let toStartDate = startDate - currentTimeStampUtc;
  toStartDate > 0;
  const millisecondsDelta =
    toStartDate > 0
      ? startDate - currentTimeStampUtc
      : endDate - currentTimeStampUtc;
  if (millisecondsDelta < 0) {
    return `00 : 00 : 00 : 00`;
  }
  const seconds = Math.floor(millisecondsDelta / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const daysFormatted = days < 10 ? `0${days}` : days;
  const hoursFormatted = hours % 24 < 10 ? `0${hours % 24}` : hours % 24;
  const minutesFormatted =
    minutes % 60 < 10 ? `0${minutes % 60}` : minutes % 60;
  const secondsFormatted =
    seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
  return `${daysFormatted} : ${hoursFormatted} : ${minutesFormatted} : ${secondsFormatted}`;
};

const apiClient = new ApiClient();

export default function TrustedSetup() {
  const [formattedCountDownTime, setFormattedCountDownTime] = useState<
    string | undefined
  >();
  const [currentTime, setCurrentTime] = useState<number>();
  const [hasStarted, setHasStarted] = useState<boolean>();
  const [selectedCeremonyRound, setSelectedCeremonyRound] = useState(1);
  const [attestationDataNameFilter, setAttestationDataNameFilter] = useState<
    string | undefined
  >();
  const [contributions, setContributions] = useState<Contribution[]>([]);
  useEffect(() => {
    setTimeout(() => {
      const utcTimeStamp = getUtcTimeStamp();
      let hasCeremonyStarted = startDate < utcTimeStamp;
      setHasStarted(hasCeremonyStarted);
      setTimeDeltaHelper(setCurrentTime);
    }, 1000);

    // have to wrap to async as we need async funcs
    const loadAsyncData = async () => {
      // start fetching data
      const entriesOfCeremonyRound =
        await apiClient.getContributionIfOfCeremonyRound(selectedCeremonyRound);
      setContributions(entriesOfCeremonyRound);
    };

    // call the async block
    loadAsyncData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const utcTimeStamp = getUtcTimeStamp();
      let hasCeremonyStarted = startDate < utcTimeStamp;
      setHasStarted(hasCeremonyStarted);

      const formattedTimeDelta = getFormattedTimeDelta();
      setFormattedCountDownTime(formattedTimeDelta);
      setTimeDeltaHelper(setCurrentTime);
    }, 1000);
  }, [currentTime]);

  useEffect(() => {
    // have to wrap to async as we need async funcs
    const loadAsyncData = async () => {
      try {
        const entriesOfCeremonyRound =
          await apiClient.getContributionIfOfCeremonyRound(
            selectedCeremonyRound
          );
        const entriesOfCeremonyRoundFilteredByName =
          entriesOfCeremonyRound.filter((entryOfCeremonyRound) => {
            if (attestationDataNameFilter) {
              return entryOfCeremonyRound.full_name
                .toLocaleLowerCase()
                .includes(attestationDataNameFilter.toLocaleLowerCase());
            } else {
              return true;
            }
          });
        setContributions(entriesOfCeremonyRoundFilteredByName);
      } catch {
        setContributions([]);
      }
    };

    // call the async block
    loadAsyncData();
  }, [selectedCeremonyRound, attestationDataNameFilter]);

  return (
    <TrustedSetupContainer>
      {/* <HeroBanner /> */}
      <TrustedSetupBannerContainer>
        <CatImage src={Cat} alt="CatImage" />
        <MiddleSectionOfContainerOnlyMobile>
          <BannerNamadaLogo src={LogoInBanner} alt="BannerNamadaLogo" />
          <TimeCountDownContainerOnlyMobile>
            <TimeCountDownContainerTopLabelOnlyMobile>
              {hasStarted ? "Ends" : "Starts"} in: (UTC)
            </TimeCountDownContainerTopLabelOnlyMobile>
            <TimeCountDownTimeHeaderOnlyMobile>
              {formattedCountDownTime}
            </TimeCountDownTimeHeaderOnlyMobile>
            <TimeCountDownLabelContainerOnlyMobile>
              <TimeCountDownLabelCharacterContainer>
                dd
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                :
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                hh
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                :
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                mm
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                :
              </TimeCountDownLabelCharacterContainer>
              <TimeCountDownLabelCharacterContainer>
                ss
              </TimeCountDownLabelCharacterContainer>
            </TimeCountDownLabelContainerOnlyMobile>
          </TimeCountDownContainerOnlyMobile>
        </MiddleSectionOfContainerOnlyMobile>

        <div>
          <HammerImage src={Hammer} alt="HammerImage" />
        </div>
      </TrustedSetupBannerContainer>

      <TrustedSetupInnerContainer>
        <TrustedSetupTableContainer>
          <TableUtilsRow>
            <div>
              <h1>Contributions</h1>
            </div>

            <TableUtilsRowRightContainer>
              <TableUtilsItemContainer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/anoma/namada-trusted-setup#verify-a-contribution"
                >
                  <CeremonyRoundVerifyButton>
                    Verify Contribution
                  </CeremonyRoundVerifyButton>
                </a>
              </TableUtilsItemContainer>
              <TableUtilsItemContainer>
                <CohortLabel>Cohort</CohortLabel>
                <CeremonyRoundSelect
                  name="ceremony-round"
                  onChange={(event) => {
                    const ceremonyRoundAsNumber = Number(event.target.value);
                    setSelectedCeremonyRound(ceremonyRoundAsNumber);
                  }}
                >
                  {/* adding the <option> element n times */}
                  {[...Array(33)].map((_element, index) => {
                    return (
                      <option key={`${index + 1}`} value={`${index + 1}`}>
                        {index + 1}
                      </option>
                    );
                  })}
                </CeremonyRoundSelect>
              </TableUtilsItemContainer>

              <TableUtilsItemContainer>
                <SearchIconContainer>
                  <Image imageName={ImageName.MagnifyingGlass} />
                </SearchIconContainer>
                <FilterInput
                  onChange={(event) => {
                    setAttestationDataNameFilter(event.target.value);
                  }}
                />
              </TableUtilsItemContainer>
            </TableUtilsRowRightContainer>
          </TableUtilsRow>
          <TableContainer>
            <AttestationTable contributions={contributions} />
          </TableContainer>
        </TrustedSetupTableContainer>
        <Link href="/"></Link>
      </TrustedSetupInnerContainer>
    </TrustedSetupContainer>
  );
}
