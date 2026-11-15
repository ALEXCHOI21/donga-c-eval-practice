/**
 * @file step3_relational_operator.c
 * @brief Step 3: 관계 연산자(Relational Operators)와 참(1)/거짓(0)
 * @details 조건식의 연산 결과가 1(참) 또는 0(거짓)으로 산출되는 과정을 직접 확인합니다.
 */

#include <stdio.h>

int main(void)
{
    int score = 0;
    int criteria = 80; // 기준 점수: 80점
    int result = 0;

    printf("점수를 입력하세요: ");
    scanf_s("%d", &score);

    // 관계 연산자: >= (크거나 같다, 이상)
    // C언어에서 조건이 참(True)이면 1, 거짓(False)이면 0이 반환됩니다.
    result = (score >= criteria);

    printf("\n=== 관계 연산자 비교 결과 ===\n");
    printf("기준 점수: %d점\n", criteria);
    printf("입력 점수: %d점\n", score);
    printf("비교 연산식: (score >= %d)\n", criteria);
    printf("결과값 (1=참, 0=거짓): %d\n", result);

    // 기타 관계 연산자 확인
    printf("(score == 100) 만점 여부: %d\n", (score == 100));
    printf("(score < 60) 과락 여부: %d\n", (score < 60));

    return 0;
}
