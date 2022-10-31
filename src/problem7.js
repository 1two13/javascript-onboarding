// 기능 목록
// 1. user의 친구 구하기
// 2. user의 친구의 친구 구하기 => 각 10점씩
// 3. visitors 배열의 요소 => 각 1점씩 (단, user의 친구는 0점)
// 4. 3을 점수 높은 순으로 정렬하기
// 5. 단, 동점을 경우 이름순으로 정렬하기
// 6. answer는 최대 5명

// user의 친구를 구하는 함수
function findUserFriends(user, friends) {
  let userFriends = [];

  friends
    .filter((el) => el.includes(user))
    .filter((el) => {
      for (let i = 0; i < el.length; i++) {
        if (el[i] !== user) userFriends.push(el[i]);
      }
    });

  return userFriends;
}

// user의 친구의 친구 구하는 함수
function findUserFriendsOfFriends(user, friends, userFriends) {
  let IdScoreObj = {};

  for (let i = 0; i < userFriends.length; i++) {
    for (let j = 0; j < friends.length; j++) {
      // userFriends 요소를 가지고 있지만, userFriends 요소도 아니고, user도 아닐 때
      if (
        friends[j].includes(userFriends[i]) &&
        userFriends[i] === friends[j][0] &&
        !friends[j].includes(user)
      ) {
        // IdScoreObj객체에 키가 있을 때
        if (IdScoreObj.hasOwnProperty(friends[j][1]))
          IdScoreObj[friends[j][1]] += 10;
        // IdScoreObj객체에 키가 없을 때
        else IdScoreObj[friends[j][1]] = 10;
      }
    }
  }

  return IdScoreObj;
}

function problem7(user, friends, visitors) {
  // 점수가 높은 순으로 최대 5명 정렬
  let answer = [];

  let userFriends = findUserFriends(user, friends);
  let IdScoreObj = findUserFriendsOfFriends(user, friends, userFriends);

  // visitors 배열 요소들 각 1점씩
  visitors.map((el) => {
    // user의 친구가 아니고
    if (!userFriends.includes(el)) {
      // IdScoreObj객체에 키가 있을 때
      if (IdScoreObj.hasOwnProperty(el)) IdScoreObj[el] += 1;
      // IdScoreObj객체에 키가 없을 때
      else IdScoreObj[el] = 1;
    }
  });

  // sort시키기 위해 객체인 IdScoreObj를 배열로 만들기
  let sortable = [];
  for (let id in IdScoreObj) {
    sortable.push([id, IdScoreObj[id]]);
  }
  // 점수 높은 순으로 정렬
  sortable.sort((a, b) => {
    // 점수가 같은 경우 이름 순으로 정렬
    if (b[1] === a[1]) {
      return b[0] > a[0] ? -1 : 1;
    } else return b[1] - a[1];
  });

  // answer 배열에 이름만 담기
  sortable.map((el) => answer.push(el[0]));
  // answer은 최대 5명
  if (answer.length > 5) answer.slice(0, 5);

  return answer;
}

module.exports = problem7;
