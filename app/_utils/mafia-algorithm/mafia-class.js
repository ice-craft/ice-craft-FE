class Participant {
  constructor(userId, userNickname, index) {
    this.userId = userId;
    this.userNickname = userNickname;
    this.isReady = false;
    this.index = index;
  }
  setReady(isReady) {
    this.isReady = isReady;
  }
}
