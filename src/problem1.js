// 기능 목록
// 1. 예외 사항 validate 하기 (case1. pobi 또는 crong이 시작 면 또는 마지막 면이 나오도록 책을 펼치는 경우, case2. 각 배열의 값의 차이가 1 초과인 경우)
// 2. pobi의 가장 큰 수 구하기
// 3. crong의 가장 큰 수 구하기
// 4. 승패 결과 처리하기

// 예외 사항을 체크하는 함수
function validate(user) {
  // case1. user가 1, 2, 399, 400의 값을 가지고 있을 때
  if (user.filter((el) => el <= 2 || el >= 399).length > 0) return false;
  // case2. 배열의 값의 차이가 1 초과일때 ex) [99, 102]
  if (user[1] - user[0] > 1) return false;
  return true;
}

function problem1(pobi, crong) {
  // pobi 가장 큰 수
  let pobiMax;
  // 크롱의 가장 큰 수
  let crongMax;

  // pobi의 가장 큰 수 구하기
  pobi
    // 배열안에 각 자리의 숫자를 담기
    .map((el) => String(el).split(""))
    .reduce((acc, cur) => {
      pobiMax = Math.max(
        acc.reduce((acc, cur) => Number(acc) + Number(cur)),
        acc.reduce((acc, cur) => Number(acc) * Number(cur)),
        cur.reduce((acc, cur) => Number(acc) + Number(cur)),
        cur.reduce((acc, cur) => Number(acc) * Number(cur))
      );
    });

  // crong의 가장 큰 수 구하기
  crong
    // 배열안에 각 자리의 숫자를 담기
    .map((el) => String(el).split(""))
    .reduce((acc, cur) => {
      crongMax = Math.max(
        acc.reduce((acc, cur) => Number(acc) + Number(cur)),
        acc.reduce((acc, cur) => Number(acc) * Number(cur)),
        cur.reduce((acc, cur) => Number(acc) + Number(cur)),
        cur.reduce((acc, cur) => Number(acc) * Number(cur))
      );
    });

  // 승패 결과 처리하기 (포비 1, 크롱 2, 무승부 0, 예외사항 -1)
  if (!validate(pobi) || !validate(crong)) return -1;
  else if (pobiMax > crongMax) return 1;
  else if (pobiMax < crongMax) return 2;
  else return 0;
}

module.exports = problem1;
