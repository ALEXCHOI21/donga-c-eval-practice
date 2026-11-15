/**
 * @file step2_scanf_s.c
 * @brief Step 2: 변수 선언과 안전한 정수 입력(scanf_s)
 * @details 키보드로부터 정수 데이터를 안전하게 입력받는 방법을 익힙니다.
 */

#include <stdio.h>

int main(void)
{
    // 1. 점수를 저장할 정수형(int) 변수 선언 및 0으로 초기화
    int score = 0;

    // 2. 사용자에게 입력을 유도하는 안내 문구 출력 (줄바꿈 없음)
    printf("성적 입력 하세요:");

    // 3. scanf_s를 이용한 정수 입력
    // ★ 매우 중요: 변수명 앞에 반드시 주소 연산자 '&'를 붙여야 합니다!
    // &score의 의미: score 변수가 위치한 메모리 주소를 전달
    scanf_s("%d", &score);

    // 4. 입력받은 값이 정상적으로 저장되었는지 확인 출력
    printf(">> 입력된 점수는 [%d]점 입니다.\n", score);

    return 0;
}
