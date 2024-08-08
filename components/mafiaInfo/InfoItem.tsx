import React from "react";
import S from "@/style/mafiaInfo/mafiaInfo.module.css";
import Image from "next/image";
import MafiaInfoTitle from "@/assets/images/mafia_info_title.svg";
import DoctorCard from "@/assets/images/Doctor_Card.avif";
import PoliceCard from "@/assets/images/Police_Card.avif";
import MafiaCard from "@/assets/images/Mafia_Card.avif";
import CitizensCard from "@/assets/images/Citizens_Card.avif";
import MorningModalImage from "@/assets/images/mafia_info_morning.svg";
import ChoosingModalImage from "@/assets/images/mafia_info_choosing.svg";
import FinalModalImage from "@/assets/images/mafia_info_final.svg";
import VoteModalImage from "@/assets/images/mafia_info_vote.svg";
import MafiaCamImage from "@/assets/images/mafia_info_mafia.svg";
import PoliceCamImage from "@/assets/images/mafia_info_police.svg";
import DoctorCamImage from "@/assets/images/mafia_info_doctor.svg";
import CitizenCamImage from "@/assets/images/mafia_info_citizen.svg";
import CitizenModalVictory from "@/assets/images/citizen_victory.svg";
import MafiaModalVictory from "@/assets/images/mafia_victory.svg";
import MafiaGameStart from "@/assets/images/mafia_info_start.svg";

const InfoItem = () => {
  return (
    <>
      <div className={S.ruleList}>
        <h2>Game Room</h2>
        <div className={S.ruleListContent}>
          <div>
            <Image src={MafiaInfoTitle} alt="마피아 게임 방 이미지" />
            <p>게임을 시작하려면, 방 만들기 버튼을 클릭하여 방을 만듭니다.</p>
            <p>방을 만들면, 대기방으로 이동 됩니다.</p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>1. 기본 규칙&#40;Rule&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.rolesCardImage}>
              <Image src={CitizensCard} alt="시민 카드 이미지" />
              <Image src={MafiaCard} alt="마피아 카드 이미지" />
              <Image src={PoliceCard} alt="경찰 카드 이미지" />
              <Image src={DoctorCard} alt="의사 카드 이미지" />
            </div>
            <p>
              <span>5~10명</span>의 플레이어가 게임에 참여합니다.
            </p>
            <p>플레이어는 시민 팀과 마피아 팀으로 나뉘어 특정 직업을 부여 받습니다.</p>
            <p>게임은 낮과 밤으로 나뉘며, 게임 시작 시 랜덤으로 직업이 부여됩니다.</p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>2. 낮&#40;Play Time&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.morningModal}>
              <Image src={MorningModalImage} alt="낮 모달창 정보" />
            </div>
            <p>
              <span>토론시간 : </span>낮에는 1분 동안 모든 플레이어가 토론할 수 있습니다.
            </p>
            <p>
              <span>능력 사용 결과 공개 : </span>낮이 되면 마피아의 처형을 비롯한 직업의 능력 사용 결과가 공개됩니다.
              &#40;첫날 제외&#41;
            </p>
            <p>
              <span>처형 대상 결정 : </span>
              마피아가 처형 대상을 고르지 못해 아무도 죽지 않은 경우
              <span> 임의의 플레이어가 사망합니다.</span>
            </p>
            <p>
              <span>자유 대화 : </span>
              능력 사용 결과가 공개된 후, 모든 플레이어가 대화할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>3. 투표 &#40;Vote&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.choosingImage}>
              <Image src={ChoosingModalImage} alt="투표 모달창 정보" />
            </div>
            <p>
              <span>투표 시간&#40;10초&#41; : </span>
              토론 시간이 끝나면 10초 동안 투표가 진행됩니다.
            </p>
            <p>
              <span>투표 제한 : </span>각 플레이어는 한 명에게 한 번씩 투표할 수 있습니다.
            </p>
            <p>
              <span>득표 결과 공개 : </span>
              투표 시간이 종료되면 득표 결과가 공개됩니다.
            </p>
            <p>
              <span>최다 득표자 결정 : </span>
              최다 득표자가 결정되면 최후의 반론 단계로 넘어갑니다.
            </p>
            <p>
              <span>단, 과반수의 표를 넘지 못할 경우 또는 2명 이상의 최다 득표자의 표가 동일</span>할 경우에는
              <span> 랜덤으로 임의의 플레이어가 사망합니다.</span>
            </p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>4. 최후의 반론&#40;Final Debate&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.finalImage}>
              <Image src={FinalModalImage} alt="최후의 반론 모달창 정보" />
            </div>
            <p>
              <span>최후의 반론 시간&#40;30초&#41; : </span>
              최다 득표자는 10초 동안 반론을 할 수 있습니다.
            </p>
            <p>최다 득표자 플레이어만 말을 할 수 있습니다.</p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>5. 찬반 투표&#40;Final Vote&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.voteImage}>
              <Image src={VoteModalImage} alt="찬반 투표 모달창 정보" />
            </div>
            <p>
              <span>찬반 투표 시간&#40;10초&#41; : </span>
              최후의 반론 이후, 해당 플레이어를 처형할지 결정하는 찬반 투표가 진행됩니다.
            </p>
            <p>
              <span>처형 결정 : </span>
              과반수 이상의 찬성을 받으면 해당 플레이어는 처형되어 밤으로 넘어갑니다.
            </p>
            <p>
              단, 찬성보다 반대가 많으면 <span>처형되지 않고 밤으로 넘어갑니다.</span>
            </p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>6. 밤&#40;Mafia Time&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.mafiaTimeImage}>
              <Image src={MafiaCamImage} alt="마피아 캠 체크 정보" />
              <Image src={DoctorCamImage} alt="의사 캠 체크 정보" />
              <Image src={PoliceCamImage} alt="경찰 캠 체크 정보" />
              <Image src={CitizenCamImage} alt="시민 캠 체크 정보" />
            </div>
            <p>
              <span>마피아 타임 : </span>
              마피아를 제외한 모든 플레이어의 화상 채팅 및 소리가 차단됩니다.
            </p>
            <p>
              <span>능력 사용 : </span>
              밤에는 마피아, 의사, 경찰이 능력을 사용할 수 있습니다.
            </p>
            <p>
              <span>마피아 : </span>
              마피아들은 서로 합의를 통해 죽일 플레이어를 선정합니다.
            </p>
            <p>
              <span>의사 : </span>
              의사는 특정 플레이어를 선택하여 보호할 수 있습니다.
            </p>
            <p>
              <span> 경찰 : </span>
              경찰은 특정 플레이어의 직업을 알아낼 수 있습니다.
            </p>
            <p>
              직업 별 <span>&#34;한 턴에 한 번&#34; </span>능력을 사용할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>7. 승리 조건&#40;Victory Condition&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.victory}>
              <Image src={CitizenModalVictory} alt="시민 승리 이미지" />
              <Image src={MafiaModalVictory} alt="마피아 승리 이미지" />
            </div>
            <p>어느 한 팀이 판정 시기에 승리 조건을 충족하는 즉시, 해당 팀의 승리로 게임이 종료됩니다.</p>
            <p>
              판정 시기는
              <span> 밤이 끝나고 낮 </span>
              으로 넘어갈 때, <span>일반 투표가 종료</span>될 때,
              <br />
              최후의 반론 이후 <span>찬반 투표가 종료</span>되고 밤으로 넘어갈 때 입니다.
            </p>
          </div>
        </div>
      </div>
      <div className={S.ruleList}>
        <h2>8. 참가 인원&#40;Participant&#41;</h2>
        <div className={S.ruleListContent}>
          <div>
            <div className={S.mafiaGameImage}>
              <Image src={MafiaGameStart} alt="마피아 게임 시작 이미지" />
            </div>
            <p>
              <span>5명 : </span>마피아 1명, 시민 4명 &#40;최소 인원&#41;
            </p>
            <p>
              <span>6명 : </span>마피아 2명, 시민 3명, 경찰 1명
            </p>
            <p>
              <span>7명 : </span>마피아 2명, 시민 4명, 경찰 1명
            </p>
            <p>
              <span>8명 : </span>마피아 3명, 시민 3명, 경찰 1명, 의사 1명
            </p>
            <p>
              <span>9명 : </span>마피아 3명, 시민 4명, 경찰 1명, 의사 1명
            </p>
            <p>
              <span>10명 : </span>마피아 3명, 시민 4명, 경찰 1명, 의사 1명 &#40;최대 인원&#41;
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoItem;
