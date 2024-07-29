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
import GoTopButton from "@/utils/GoTopButton";

const MafiaInfoPage = () => {
  return (
    <section className={S.infoWrapper}>
      <h2>마피아 룰</h2>
      <Image src={MafiaInfoTitle} alt="마피아 정보" />
      <div>
        <h3>1. 기본 규칙</h3>
        <p>
          5~10명의 플레이어가 게임에 참여합니다. 플레이어는 시민 팀과 마피아 팀으로 나뉘어 특정 직업을 부여받습니다.
          <br />
          게임은 낮과 밤으로 나뉘며, 게임 시작 시 마피아, 의사, 경찰 순서로 특정 플레이어에게 직업이 부여된 이후 낮이
          시작됩니다.
        </p>
        <div className={S.rolesCardImage}>
          <Image src={CitizensCard} alt="시민 이미지" />
          <Image src={MafiaCard} alt="마피아 이미지" />
          <Image src={PoliceCard} alt="경찰 이미지" />
          <Image src={DoctorCard} alt="의사 이미지" />
        </div>
      </div>
      <div>
        <h3>2. 낮(play time)</h3>
        <p>
          토론시간(1분) : 낮에는 1분 동안 모든 플레이어가 토론할 수 있습니다.
          <br />
          능력 사용 결과 공개 : 낮이 되면 마피아의 처형을 비롯한 몇몇 직업의 능력 사용 결과가 공개됩니다. (첫날 제외)
          <br />
          처형 대상 결정 : 마피아가 처형 대상을 고르지 못해 아무도 죽지 않은 경우
          <span>&nbsp;"조용하게 밤이 지나갔습니다."</span> 라는 문구가 나옵니다.
          <br />
          자유 대화 : 능력 사용 결과가 공개된 후 모든 플레이어가 대화할 수 있습니다.
        </p>
        <div className={S.morningModal}>
          <Image src={MorningModalImage} alt="낮 모달창 정보" />
        </div>
      </div>
      <div>
        <h3>3. 투표(choosing)</h3>
        <p>
          투표 시간(30초) : 토론 시간이 끝나면 30초 동안 투표가 진행됩니다.
          <br /> 투표 제한 : 각 플레이어는 한 명에게 한 번씩 투표할 수 있으며, 투표 시간이 끝나기 전까지 투표 대상을
          변경할 수 있습니다. <br />
          득표 결과 공개 : 투표 시간이 종료되면 최종적인 득표 결과가 공개됩니다.  단, 누가 누구에게 투표했는지는
          공개되지 않습니다. 표가 공개되는 동안에는 아무도 말을 할 수 없습니다. <br />
          최다 득표자 결정 : 최다 득표자가 결정되면 최후의 반론 단계로 넘어갑니다. 단, 과반수의 표를 넘지 못할 경우나
          2명 이상의 최다 득표자의 표가 동일할 경우에는 다시 밤으로 시작됩니다.
        </p>
        <div className={S.choosingImage}>
          <Image src={ChoosingModalImage} alt="투표 모달창 정보" />
        </div>
      </div>
      <div>
        <h3>4. 최후의 반론(Final Debate)</h3>
        <p>최후의 반론 시간(30초): 최다 득표자는 30초 동안 반론을 할 수 있으며 해당 플레이어만 말을 할 수 있습니다.</p>
        <div className={S.finalImage}>
          <Image src={FinalModalImage} alt="최후의 반론 모달창 정보" />
        </div>
      </div>
      <div>
        <h3>5. 찬반 투표(Final Vote)</h3>
        <p>
          찬반 투표 시간(30초): 최후의 반론 이후 마지막으로 해당 플레이어를 처형할지 결정하는 찬반 투표가 진행됩니다.
          <br />
          처형 결정: 과반수 이상의 찬성을 받으면 해당 플레이어는 처형되어 밤으로 넘어갑니다. 단, 찬성보다 반대가 더
          많으면 처형되지 않고 밤으로 넘어갑니다.
        </p>
        <div className={S.voteImage}>
          <Image src={VoteModalImage} alt="찬반 투표 모달창 정보" />
        </div>
      </div>
      <div>
        <h3>6. 밤(mafia time)</h3>
        <p>
          마피아 타임: 마피아를 제외한 모든 플레이어의 화상 채팅 및 소리가 차단되며, 화면에는 <span>"마피아 타임"</span>
          으로 표시됩니다.
          <br />
          능력 사용: 밤에는 마피아, 의사, 경찰이 능력을 사용할 수 있습니다. <br />
          마피아: 마피아들은 서로 합의를 통해 죽일 플레이어를 선정합니다. (한 턴에 한 번) <br />
          의사: 의사는 특정 플레이어를 선택하여 보호할 수 있습니다. (한 턴에 한 번) <br />
          경찰: 경찰은 특정 플레이어의 직업을 알아낼 수 있습니다. (한 턴에 한 번)
        </p>
        <div className={S.mafiaTimeImage}>
          <Image src={MafiaCamImage} alt="마피아 캠 체크 정보" />
          <Image src={DoctorCamImage} alt="의사 캠 체크 정보" />
          <Image src={PoliceCamImage} alt="경찰 캠 체크 정보" />
          <Image src={CitizenCamImage} alt="시민 캠 체크 정보" />
        </div>
      </div>
      <div>
        <h3>7. 승리 조건</h3>
        <p>
          어느 한 팀이 판정 시기에 승리 조건을 충족하는 즉시 해당 팀의 승리로 게임이 종료됩니다.
          <br /> 판정 시기는 매일 3번입니다. 밤이 끝나고 낮으로 넘어갈 때, 일반 투표가 종료될 때, 최후의 반론 이후 찬반
          투표가 종료되고 밤으로 넘어갈 때입니다.
        </p>
        <div className={S.victory}>
          <Image src={CitizenModalVictory} alt="시민 승리 이미지" />
          <Image src={MafiaModalVictory} alt="마피아 승리 이미지" />
        </div>
      </div>
      <div>
        <h3>8. 참가 인원</h3>
        <p>
          5명(최소 인원): 마피아 1명, 시민 4명 <br />
          6명: 마피아 2명, 시민 3명, 경찰 1명 <br />
          7명: 마피아 2명, 시민 4명, 경찰 1명 <br />
          8명: 마피아 3명, 시민 3명, 경찰 1명, 의사 1명 <br />
          9명: 마피아 3명, 시민 4명, 경찰 1명, 의사 1명 <br />
          10명(최대 인원): 마피아 3명, 시민 4명, 경찰 1명, 의사 1명
        </p>
      </div>
      <div className={S.mafiaGameImage}>
        <Image src={MafiaGameStart} alt="마피아 게임 시작 이미지" />
      </div>
      <GoTopButton />
    </section>
  );
};

export default MafiaInfoPage;
