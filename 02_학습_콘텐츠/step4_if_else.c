/**
 * @file step4_if_else.c
 * @brief Step 4: if ~ else 조건 분기문 기초
 * @details 조건이 참(1)일 때와 거짓(0)일 때 서로 다른 문장을 실행하는 양자택일 구조를 익힙니다.
 */

#include <stdio.h>

int main(void)
{
    int temperature = 0; // 공정 가열로 온도 변수

    printf("현재 센서 온도를 입력하세요: ");
    scanf_s("%d", &temperature);

    // [주의] if (조건); <-- 괄호 뒤에 세미콜론을 절대 붙이지 마세요!
    if (temperature >= 100)
    {
        // 온도가 100도 이상인 경우 (조건 참)
        printf("[경보] 고온 상태입니다! 냉각 팬을 가동합니다.\n");
    }
    else
    {
        // 온도가 100도 미만인 경우 (조건 거짓)
        printf("[정상] 안정 상태입니다. 공정을 계속 진행합니다.\n");
    }

    return 0;
}
