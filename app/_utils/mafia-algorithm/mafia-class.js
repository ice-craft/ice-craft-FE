class Citizen {
  constructor(userId, userNickname, index) {
    this.userId = userId;
    this.userNickname = userNickname;
    this.isReady = false;
    this.index = index; //NOTE - 필요한지 생각해보기
    this.role = "시민";
    this.isLived = true;
    this.voteTo = null;
    this.votedCount = 0;
  }

  //NOTE - 게임 레디하기
  ready(isReady) {
    this.isReady = isReady;
  }

  //NOTE - 플레이어를 선택하는 투표
  voteToPlayer(player) {
    this.voteTo = player;
    player.votedCount++;
  }

  //NOTE - 찬성, 반대를 결정하는 투표
  voteYesOrNo(votes, yesOrNo) {
    votes.push(yesOrNo);
    return votes;
  }
  //NOTE - 방 나가기, setRoles 따로 처리하기
  exit() {
    this.isLived = false;
  }
}

class Mafia extends Citizen {
  constructor(citizen) {
    super(citizen.userId, citizen.userNickname, citizen.index);
    this.role = "마피아";
  }

  //NOTE - 플레이어 죽임,setRoles 따로 처리하기
  killPlayer(player) {
    player.isLived = false;

    return player;
  }
}

class Police extends Citizen {
  constructor(citizen) {
    super(citizen.userId, citizen.userNickname, citizen.index);
    this.role = "경찰";
  }

  //NOTE - 경찰이 플레이어가 마피아 인지 알아냄
  checkPlayerMafia(player) {
    if (player.role === "마피아") {
      return true;
    } else {
      return false;
    }
  }
}

class Doctor extends Citizen {
  constructor(citizen) {
    super(citizen.userId, citizen.userNickname, citizen.index);
    this.role = "의사";
  }

  //NOTE - 의사가 플레이어 살림, setRoles 따로 처리
  savePlayer(player) {
    player.isLived = true;

    return player;
  }
}

class Moderator {
  constructor(playerCount) {
    this.players = [];
    this.playerCount = playerCount;
    this.roles = {};

    switch (this.playerCount) {
      case 5:
        this.roomComposition = { mafiaCount: 1, citizenCount: 4, policeCount: 0, doctorCount: 0 };
      case 6:
        this.roomComposition = { mafiaCount: 2, citizenCount: 3, policeCount: 1, doctorCount: 0 };
      case 7:
        this.roomComposition = { mafiaCount: 2, citizenCount: 4, policeCount: 1, doctorCount: 0 };
      case 8:
        this.roomComposition = { mafiaCount: 3, citizenCount: 3, policeCount: 1, doctorCount: 1 };
      case 9:
        this.roomComposition = { mafiaCount: 3, citizenCount: 4, policeCount: 1, doctorCount: 1 };
      case 10:
        this.roomComposition = { mafiaCount: 3, citizenCount: 4, policeCount: 1, doctorCount: 1 };
    }
  }

  //NOTE - 인원 수 맞는지 확인
  checkPlayerCountEnough() {
    return this.players.length === this.playerCount;
  }

  //NOTE - 모든 플레이어들이 전부 레디했는지 확인
  checkAllPlayersReady() {
    let result = true;
    this.players.forEach((player) => {
      if (player.isReady === false) {
        result = false;
      }
    });

    return result;
  }

  //NOTE - 게임이 시작가능한 지 확인
  canGameStart(isEnoughCount, isAllReady) {
    return isEnoughCount && isAllReady;
  }

  //NOTE - 플레이어에게 다른 플레이어의 역할 공개
  openPlayerRole(clientPlayer, rolePlayer, roleName) {
    console.log(`${clientPlayer.userNickname} 클라이언트, ${rolePlayer.userNickname}의 역할은 ${roleName}입니다.`);
  }

  //NOTE - 게임 시작
  gameStart() {
    console.log("게임이 시작되었습니다.");
  }

  //NOTE - 게임 끝
  gameOver() {
    console.log("게임이 종료되었습니다.");
  }

  startTimer(seconds) {
    console.log("타이머 시작");
    if (seconds >= 60) {
      console.log(`${Math.floor(seconds / 60)}분 ${seconds % 60}초 재는 중`);
    } else {
      console.log(`${seconds % 60}초 재는 중`);
    }
    console.log("타이머 종료");
  }

  //NOTE - 라운드 시작
  roundStart() {
    console.log("라운드가 시작되었습니다.");
  }

  //NOTE - 라운드 종료
  roundOver() {
    console.log("라운드가 종료되었습니다.");
  }

  //NOTE - 밤 시작
  nightStart() {
    console.log("밤이 되었습니다.");
  }

  //NOTE - 밤 종료
  nightOver() {
    console.log("밤이 끝났습니다.");
  }

  //NOTE - 아침 시작
  morningStart() {
    console.log("아침이 되었습니다.");
  }

  //NOTE - 아침 종료
  morningOver() {
    console.log("아침이 끝났습니다.");
  }

  //NOTE - 플레이어 죽임,setRoles 따로 처리하기
  killPlayer(player) {
    player.isLived = false;

    return player;
  }

  //NOTE - 투표 리셋
  resetVote() {
    this.players.forEach((player) => {
      player.votedCount = 0;
      player.voteTo = null;
    });
  }

  //NOTE - 플레이어들이 받은 표 확인
  getPlayersVoteResult = () => {
    const voteResult = {};
    this.players.forEach((player) => {
      voteResult[player.userNickname] = player.votedCount;
    });
    return voteResult;
  };

  //NOTE - 표를 가장 많이 받은 플레이어 확인
  getMostVotedPlayer() {
    let sortedResult = [...this.players];
    let isValid;

    sortedResult.sort((a, b) => b.votedCount - a.votedCount);
    isValid = sortedResult[0].votedCount !== sortedResult[1].votedCount;

    return { isValid, result: sortedResult[0] };
  }

  //NOTE - 찬성 반대 투표 결과
  getYesOrNoVoteResult(votes) {
    let yesCount = 0;
    let noCount = 0;
    let isValid;

    votes.forEach((vote) => {
      if (vote === true) {
        yesCount++;
      } else {
        noCount++;
      }
    });

    isValid = yesCount !== noCount;

    return {
      isValid,
      result: yesCount > noCount,
      detail: { yesCount, noCount }
    };
  }

  //NOTE - 유저들에게 투표 결과 보여줌
  showVoteResult(vote) {
    this.players.forEach((player) => console.log(`사회자[to : ${player.userNickname}] : ${vote}`));
  }

  //NOTE - 유저가 살았는지 확인
  checkPlayerLived(player) {
    return player.isLived === true;
  }

  //NOTE - 사회자가 특정 유저에게 진행 상황 말함
  speak(player, line) {
    console.log(`사회자[to : ${player.userNickname}] : ${line}`);
  }

  //NOTE - 참가자들 랜덤으로 섞기(피셔-예이츠 셔플 알고리즘)
  shufflePlayers() {
    for (let i = this.players.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); //NOTE - math.random() 대체제 생각해보기
      [this.players[i], this.players[j]] = [this.players[j], this.players[i]];
    }
  }

  //NOTE - 게임을 진행하면서 각 역할을 누가 맡았는지 객체에 저장
  setRoles = () => {
    Object.keys(this.roles).forEach((key) => delete this.roles[key]);

    this.players.forEach((player) => {
      if (player.role === "마피아" || player.role === "시민") {
        if (this.roles[player.role] === undefined) {
          this.roles[player.role] = [];
        }
        if (player.isLived) {
          this.roles[player.role].push(player);
        }
      } else {
        this.roles[player.role] = player;
      }
    });
  };

  //NOTE - 사회자가 플레이어의 카메라를 켬
  turnOnCamera(clientPlayer, cameraPlayer) {
    console.log(`${clientPlayer.userNickname} 클라이언트의 ${cameraPlayer.userNickname} 카메라 켬`);
  }

  //NOTE - 사회자가 플레이어의 카메라를 끔
  turnOffCamera(clientPlayer, cameraPlayer) {
    console.log(`${clientPlayer.userNickname} 클라이언트의 ${cameraPlayer.userNickname} 카메라 끔`);
  }

  //NOTE - 사회자가 플레이어의 마이크를 켬
  turnOnMike(clientPlayer, mikePlayer) {
    console.log(`${clientPlayer.userNickname} 클라이언트의 ${mikePlayer.userNickname} 마이크 켬`);
  }

  //NOTE - 사회자가 플레이어의 마이크를 끔
  turnOffMike(clientPlayer, mikePlayer) {
    console.log(`${clientPlayer.userNickname} 클라이언트의 ${mikePlayer.userNickname} 마이크 끔`);
  }

  //NOTE - 어느 팀이 이겼는지 결과 반환
  whoWins(roles) {
    const mafiaCount = roles["마피아"].length;
    const citizenCount = roles["시민"].length;

    if (mafiaCount === 0) {
      return { isValid: true, result: "시민" };
    }
    if (mafiaCount > citizenCount || mafiaCount === citizenCount) {
      return { isValid: true, result: "마피아" };
    }

    return { isValid: false };
  }
}

//NOTE - 플레이어 수
let playerCount;

//NOTE - 랜덤으로 지정된 플레이어
let randomPlayer;

//NOTE - 마피아 플레이어 인원 수
let mafiaCount;

//NOTE - 플레이어들의 찬반 투표 결과
const votes = [];

//NOTE - 역할이 마피아인 플레이어 목록
let mafiaPlayers;

//NOTE - 역할이 의사인 플레이어
let doctorPlayer;

//NOTE - 역할이 경찰인 플레이어
let policePlayer;

//NOTE - 역할이 시민인 플레이어 목록
let citizenPlayers;

//NOTE - 죽기로 결정된 플레이어
let killedPlayer;

//NOTE - 경찰이 조사한 플레이어가 마피아인지 여부
let isPlayerMafia;

//NOTE - 방을 나갈지 선택
let choiceToExit;

const gamePlay = () => {
  playerCount = 8; //NOTE - 방 유저 정원 8명 결정
  const moderator = new Moderator(playerCount); //NOTE - 사회자 생성

  mafiaCount = moderator.roomComposition.mafiaCount; //NOTE - 마피아 플레이어 수

  //NOTE - 플레이어들 게임 참가
  for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
    moderator.players[playerIndex] = new Citizen(
      `${playerIndex}-${playerIndex}-${playerIndex}`,
      "user" + playerIndex,
      playerIndex
    );
  }

  //NOTE - 모든 플레이어들이 레디함
  for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
    moderator.players[playerIndex].ready(true);
  }

  const isAllPlayerEnoughCount = moderator.checkPlayerCountEnough(); //NOTE - 플레이어들이 방 정원을 채웠는지
  const isAllPlayersReady = moderator.checkAllPlayersReady(); //NOTE - 플레이어들이 전부 레디했는지

  if (
    moderator.canGameStart(isAllPlayerEnoughCount, isAllPlayersReady) //NOTE - 게임이 시작 가능한 상태인지 확인
  ) {
    moderator.gameStart(); //NOTE - 게임 시작
  } else {
    console.log("게임 시작 불가"); //NOTE - 게임 시작 조건 못 갖춤
  }

  moderator.roundStart();

  //NOTE - 모든 참가자들은 역할을 배정받고 플레이어로 변경 (매개 변수가 participant라서 이렇게 대처, 클래스면 게임 순서대로 구현 가능)
  moderator.nightStart(); //NOTE - 밤이 시작됨

  //NOTE - 모든 플레이어들의 카메라와 마이크 끔
  moderator.players.forEach((clientPlayer) =>
    moderator.players.forEach((player) => {
      moderator.turnOffCamera(clientPlayer, player);
      moderator.turnOffMike(clientPlayer, player);
    })
  );

  //NOTE - 플레이어들을 무작위로 섞음
  moderator.shufflePlayers();

  //NOTE - 모든 유저들 작업
  moderator.players.forEach((player) => moderator.speak(player, "마피아를 뽑겠습니다."));

  //NOTE - 마피아 인원 수만큼 플레이어들에게 마피아 역할 배정
  for (let playerIndex = 0; playerIndex < mafiaCount; playerIndex++) {
    randomPlayer = moderator.players[playerIndex]; //NOTE - 랜덤으로 플레이어 선택
    moderator.players[playerIndex] = new Mafia(randomPlayer); //NOTE - 플레이어들의 역할으 마피아로 지정
  }

  moderator.setRoles();
  mafiaPlayers = moderator.roles["마피아"];

  //NOTE - 마피아 유저들에게 자신이 마피아인 것을 알리고 마피아인 유저가 누구인지 공개
  mafiaPlayers.forEach((clientPlayer) =>
    mafiaPlayers.forEach((rolePlayer) => moderator.openPlayerRole(clientPlayer, rolePlayer, "마피아"))
  );

  moderator.players.forEach((player) => moderator.speak(player, "마피아 들은 고개를 들어 서로를 확인해 주세요."));

  //NOTE - 마피아 유저들 화면의 마피아 유저 화상 카메라와 마이크만 켬
  mafiaPlayers.forEach((clientPlayer) =>
    mafiaPlayers.forEach((player) => {
      moderator.turnOnCamera(clientPlayer, player);
      moderator.turnOnMike(clientPlayer, player);
    })
  );

  moderator.startTimer(90); //NOTE - 시간 재기

  //NOTE - 마피아 유저들 화면의 마피아 유저 화상 카메라와 마이크만 끔
  mafiaPlayers.forEach((clientPlayer) =>
    mafiaPlayers.forEach((player) => {
      moderator.turnOffCamera(clientPlayer, player);
      moderator.turnOffMike(clientPlayer, player);
    })
  );

  moderator.players.forEach((player) => moderator.speak(player, "의사를 뽑겠습니다."));

  randomPlayer = moderator.players[mafiaCount]; //NOTE - 랜덤으로 플레이어 선택
  moderator.players[mafiaCount] = new Doctor(randomPlayer); //NOTE - 참가자를 의사 플레이어로 설정

  moderator.setRoles();
  doctorPlayer = moderator.roles["의사"];

  moderator.openPlayerRole(doctorPlayer, doctorPlayer, "의사"); //NOTE - 의사 플레이어의 화면에서 자신이 의사임을 알림

  moderator.players.forEach((player) => moderator.speak(player, "경찰을 뽑겠습니다."));

  randomPlayer = moderator.players[mafiaCount + 1]; //NOTE - 랜덤으로 플레이어 선택
  moderator.players[mafiaCount + 1] = new Police(randomPlayer); //NOTE - 참가자를 경찰 플레이어로 설정

  moderator.setRoles();
  policePlayer = moderator.roles["경찰"];

  moderator.openPlayerRole(policePlayer, policePlayer, "경찰"); //NOTE - 경찰 플레이어의 화면에서 자신이 경찰임을 알림

  citizenPlayers = moderator.roles["시민"];

  //NOTE - 시민 플레이어의 화면에서 자신이 시민임을 알림
  citizenPlayers.forEach((citizenPlayer) => moderator.openPlayerRole(citizenPlayer, citizenPlayer, "시민"));

  moderator.nightOver(); //NOTE - 밤 종료
  moderator.roundOver(); //NOTE - 라운드 종료

  moderator.roundStart(); //NOTE - 라운드 시작
  moderator.morningStart(); //NOTE - 아침 시작

  //NOTE - 모든 플레이어들의 화면과 마이크 켬
  moderator.players.forEach((clientPlayer) =>
    moderator.players.forEach((player) => {
      moderator.turnOnCamera(clientPlayer, player);
      moderator.turnOnMike(clientPlayer, player);
    })
  );

  moderator.players.forEach((player) => moderator.speak(player, "모든 유저는 토론을 통해 마피아를 찾아내세요."));

  moderator.startTimer(90); //NOTE - 시간 재기

  moderator.players.forEach((player) => moderator.speak(player, "토론이 끝났습니다."));

  moderator.players.forEach((player) => moderator.speak(player, "마피아일 것 같은 사람의 화면을 클릭해주세요."));

  moderator.players[0].voteToPlayer(moderator.players[1]); //NOTE - 0번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표
  moderator.players[1].voteToPlayer(moderator.players[2]); //NOTE - 1번 인덱스 플레이어가 2번 인덱스 플레이어에게 투표
  moderator.players[2].voteToPlayer(moderator.players[1]); //NOTE - 2번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표
  moderator.players[3].voteToPlayer(moderator.players[1]); //NOTE - 3번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표
  moderator.players[4].voteToPlayer(moderator.players[1]); //NOTE - 4번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표
  moderator.players[5].voteToPlayer(moderator.players[1]); //NOTE - 5번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표
  moderator.players[6].voteToPlayer(moderator.players[2]); //NOTE - 6번 인덱스 플레이어가 2번 인덱스 플레이어에게 투표
  moderator.players[7].voteToPlayer(moderator.players[1]); //NOTE - 7번 인덱스 플레이어가 1번 인덱스 플레이어에게 투표

  moderator.startTimer(90); //NOTE - 시간 재기

  const voteBoard = moderator.getPlayersVoteResult(); //NOTE - 투표 결과 확인 (누가 얼마나 투표를 받았는지)
  const mostVoteResult = moderator.getMostVotedPlayer(); //NOTE - 투표를 가장 많이 받은 사람 결과 (확정X, 동률일 가능성 존재)

  moderator.resetVote(); //NOTE - 플레이어들이 한 투표 기록 리셋
  moderator.players.forEach((player) => moderator.showVoteResult(voteBoard));

  if (mostVoteResult.isValid) {
    //NOTE - 투표 성공

    moderator.players.forEach((player) =>
      moderator.speak(player, `${mostVoteResult.result.userNickname}님이 마피아로 지복되었습니다.`)
    );

    moderator.players.forEach((player) =>
      moderator.speak(player, `${mostVoteResult.result.userNickname}님은 최후의 변론을 시작하세요.`)
    );

    moderator.startTimer(90); //NOTE - 시간 재기

    moderator.players.forEach((player) => moderator.speak(player, "찬성/반대 투표를 해주세요."));

    moderator.startTimer(90); //NOTE - 시간 재기

    moderator.players[0].voteYesOrNo(votes, false); //NOTE - 0번 인덱스 플레이어가 찬성에 투표
    moderator.players[1].voteYesOrNo(votes, true); //NOTE - 1번 인덱스 플레이어가 찬성에 투표
    moderator.players[2].voteYesOrNo(votes, true); //NOTE - 2번 인덱스 플레이어가 찬성에 투표
    moderator.players[3].voteYesOrNo(votes, false); //NOTE - 3번 인덱스 플레이어가 반대에 투표
    moderator.players[4].voteYesOrNo(votes, false); //NOTE - 4번 인덱스 플레이어가 반대에 투표
    moderator.players[5].voteYesOrNo(votes, false); //NOTE - 5번 인덱스 플레이어가 찬성에 투표
    moderator.players[6].voteYesOrNo(votes, true); //NOTE - 6번 인덱스 플레이어가 찬성에 투표
    moderator.players[7].voteYesOrNo(votes, true); //NOTE - 7번 인덱스 플레이어가 찬성에 투표

    const yesOrNoVoteResult = moderator.getYesOrNoVoteResult(votes); //NOTE - 찬반 투표 결과 (확정X, 동률 나올 수 있음)

    moderator.showVoteResult(yesOrNoVoteResult.result.detail);

    //NOTE - 투표 결과가 유효하고(동률이 아님), 찬성이 반대보다 많은 경우
    if (yesOrNoVoteResult.isValid && yesOrNoVoteResult.result) {
      killedPlayer = moderator.killPlayer(mostVoteResult); //NOTE - 투표를 가장 많이 받은 플레이어 사망

      moderator.setRoles();
      mafiaPlayers = moderator.roles["마피아"];
      doctorPlayer = moderator.roles["의사"];
      policePlayer = moderator.roles["경찰"];
      citizenPlayers = moderator.roles["시민"];

      isPlayerMafia = mafiaPlayers.indexOf(killedPlayer) !== -1; //NOTE - 죽은 플레이어가 마피아인지 확인

      //NOTE - 죽은 플레이어가 마피아인지 시민인지 알림
      moderator.players.forEach((player) =>
        isPlayerMafia ? moderator.speak(player, "마피아가 죽었습니다.") : moderator.speak(player, "시민이 죽었습니다.")
      );

      moderator.players.forEach((clientPlayer) => {
        const role = isPlayerMafia ? "마피아" : "시민";

        moderator.openPlayerRole(clientPlayer, killedPlayer, role);
      });
    } else {
      //NOTE - 투표 실패, 동률이 나옴
      console.log("동률 나옴");
    }
  }

  moderator.morningOver(); //NOTE - 아침 종료
  moderator.nightStart(); //NOTE - 밤이 시작됨

  //NOTE - 모든 유저들 화상 카메라와 마이크만 끔
  moderator.players.forEach((clientPlayer) =>
    moderator.players.forEach((player) => {
      moderator.turnOffCamera(clientPlayer, player);
      moderator.turnOffMike(clientPlayer, player);
    })
  );

  moderator.players.forEach((player) => moderator.speak(player, "마피아는 누구를 죽일지 결정해주세요."));

  //NOTE - 마피아 유저들 화면의 마피아 유저 화상 카메라와 마이크만 켬
  mafiaPlayers.forEach((clientPlayer) => {
    mafiaPlayers.forEach((player) => {
      moderator.turnOnCamera(clientPlayer, player);
      moderator.turnOnMike(clientPlayer, player);
    });
  });

  mafiaPlayers.forEach((mafiaPlayer) => {
    moderator.speak(mafiaPlayer, "제스처를 통해 상의하세요.");
    moderator.speak(mafiaPlayer, "누구를 죽일지 선택하세요.");
  });

  moderator.startTimer(90); //NOTE - 시간 재기
  killedPlayer = mafiaPlayers[0].killPlayer(moderator.players[0]); //NOTE - 가장 먼저 선택한 마피아의 지시를 따름

  //NOTE - 마피아 유저들 화면의 마피아 유저 화상 카메라와 마이크만 끔
  mafiaPlayers.forEach((clientPlayer) => {
    mafiaPlayers.forEach((player) => {
      moderator.turnOffCamera(clientPlayer, player);
      moderator.turnOffMike(clientPlayer, player);
    });
  });

  mafiaPlayers.forEach((player) => moderator.speak(player, "의사는 누구를 살릴 지 결정하세요."));

  //NOTE - 의사가 살아있을 경우
  if (moderator.roles["의사"] !== undefined) {
    doctorPlayer = moderator.roles["의사"]; //NOTE - 역할이 의사인 플레이어 인덱스 반환

    moderator.startTimer(90); //NOTE - 시간 재기

    doctorPlayer.savePlayer(killedPlayer); //NOTE - 의사가 플레이어를 살림
  }

  moderator.players.forEach((player) => moderator.speak(player, "경찰은 마피아 의심자를 결정해주세요."));

  //NOTE - 경찰이 살아있을 경우
  if (moderator.roles["경찰"] !== undefined) {
    policePlayer = moderator.roles["경찰"];

    isPlayerMafia = policePlayer.checkPlayerMafia(moderator.players[0]); //NOTE - 0번 인덱스 플레이어가 마피아인지 의심

    isPlayerMafia
      ? moderator.speak(policePlayer, "해당 플레이어는 마피아가 맞습니다.")
      : moderator.speak(policePlayer, "해당 플레이어는 마피아가 아닙니다.");
  }

  moderator.setRoles();
  mafiaPlayers = moderator.roles["마피아"];
  doctorPlayer = moderator.roles["의사"];
  policePlayer = moderator.roles["경찰"];
  citizenPlayers = moderator.roles["시민"];

  moderator.nightOver(); //NOTE - 밤 종료
  moderator.roundOver(); //NOTE - 라운드 종료
  moderator.roundStart(); //NOTE - 라운드 시작
  moderator.morningStart(); //NOTE - 아침 시작

  //NOTE - 모든 유저들 화상 카메라와 마이크만 켬
  moderator.players.forEach((clientPlayer) =>
    moderator.players.forEach((player) => {
      moderator.turnOnCamera(clientPlayer, player);
      moderator.turnOnMike(clientPlayer, player);
    })
  );

  //NOTE - 마피아가 죽일려고한 마피아가 살았는지 죽었는지 확인
  if (killedPlayer.isLived) {
    moderator.players.forEach((player) => moderator.speak(player, "의사의 활약으로 아무도 죽지 않았습니다."));
  } else {
    moderator.players.forEach((player) => moderator.speak(player, `${killedPlayer.userNickname}님이 죽었습니다.`));
  }

  moderator.speak(killedPlayer, "게임을 관전 하시겠습니까? 나가시겠습니까?");
  choiceToExit = true; //NOTE - 나간다고 가정

  //NOTE - 방을 나갈지 관전할지
  if (choiceToExit) {
    killedPlayer.exit(); //NOTE - 플레이어는 방을 나감, 중간에 나가는 경우에도 사용할 수 있음
  }
  moderator.morningOver(); //NOTE - 아침 종료
  moderator.roundOver(); //NOTE - 라운드 종료

  if (moderator.whoWins.isValid) {
    //NOTE - 게임 종료 만족하는 지
    for (let playerIndex = 0; playerIndex < playerCount; playerIndex++) {
      moderator.speak(players, playerIndex`${moderator.whoWins.result} 팀이 이겼습니다.`); //NOTE - 어느 팀이 이겼는지 알림
    }

    gameOver(); //NOTE - 게임 종료
  }
};
gamePlay();
