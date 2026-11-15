/**
 * @file app.js
 * @brief 동아마이스터고 C언어 3회차 수행평가 실습 웹사이트 인터랙션 스크립트
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    initChecklist();
    runSimPreview();
});

// 1. Navigation & Steps
const steps = ['0', '1', '2', '3', '4', '5', 'sim', 'check'];
let currentStepIndex = 0;

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const stepId = btn.getAttribute('data-step');
            goToStep(stepId);
        });
    });
    updateProgress();
}

function goToStep(stepId) {
    // String or number conversion
    const stepStr = String(stepId);
    
    // Hide all sections
    document.querySelectorAll('.step-section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show target section
    const targetSec = document.getElementById(`step-${stepStr}`);
    if (targetSec) {
        targetSec.classList.add('active');
    }

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(btn => {
        if (btn.getAttribute('data-step') === stepStr) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update index & progress
    const idx = steps.indexOf(stepStr);
    if (idx !== -1) {
        currentStepIndex = idx;
    }
    updateProgress();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateProgress() {
    const total = steps.length;
    const current = currentStepIndex + 1;
    const percent = Math.round((current / total) * 100);

    const progressBar = document.getElementById('learningProgressBar');
    const progressText = document.getElementById('progressPercent');

    if (progressBar) progressBar.style.width = `${percent}%`;
    if (progressText) progressText.textContent = `${percent}% 완료`;
}

function goToSimulator() {
    goToStep('sim');
}

function goToChecklist() {
    goToStep('check');
}

// 2. Theme Toggle (Dark / Light)
function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('theme-dark');
            if (isDark) {
                document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-light');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.remove('theme-light');
                document.body.classList.add('theme-dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}

// 3. Code Copy & Toast
function copyCode(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    const textToCopy = el.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('📋 코드가 클립보드에 복사되었습니다!');
    }).catch(err => {
        console.error('Copy failed:', err);
        showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2400);
}

// 4. Interactive Quiz
function checkQuiz(quizId, optionIndex) {
    const quizBox = document.querySelector(`.quiz-box[data-quiz="${quizId}"]`);
    if (!quizBox) return;

    const buttons = quizBox.querySelectorAll('.quiz-btn');
    const feedback = document.getElementById(`${quizId}-feedback`);
    const clickedBtn = buttons[optionIndex];
    const isCorrect = clickedBtn.getAttribute('data-correct') === 'true';

    buttons.forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = true;
    });

    if (isCorrect) {
        clickedBtn.classList.add('correct');
        feedback.className = 'quiz-feedback success';
        feedback.innerHTML = '🎉 정답입니다! C언어 과제는 반드시 <code>.c</code> 확장자와 <code>&amp;</code> 주소 연산자 원칙을 지켜야 합니다.';
    } else {
        clickedBtn.classList.add('wrong');
        feedback.className = 'quiz-feedback error';
        feedback.innerHTML = '❌ 오답입니다. 다시 한번 개념 설명을 꼼꼼히 확인해보세요!';
        setTimeout(() => {
            buttons.forEach(btn => btn.disabled = false);
        }, 1500);
    }
}

// 5. Challenge Tabs
function switchChallengeTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const activeTab = document.getElementById(`tab-${tabName}`);
    if (activeTab) activeTab.classList.add('active');

    // Button active
    event.currentTarget.classList.add('active');
}

// 6. Virtual C Console Simulator
function getCutoffValue() {
    const select = document.getElementById('simCutoff');
    const customInput = document.getElementById('simCustomCutoff');
    if (!select) return 80;

    if (select.value === 'custom') {
        if (customInput) customInput.classList.remove('hidden');
        return parseInt(customInput.value, 10) || 80;
    } else {
        if (customInput) customInput.classList.add('hidden');
        return parseInt(select.value, 10);
    }
}

function runSimPreview() {
    getCutoffValue();
}

function runSimExecution() {
    const cutoff = getCutoffValue();
    const scoreInput = document.getElementById('simScoreInput');
    const scoreVal = parseInt(scoreInput.value, 10);

    const termEcho = document.getElementById('termScoreEcho');
    const termResult = document.getElementById('termLineResult');

    if (isNaN(scoreVal)) {
        alert('올바른 정수 점수를 입력하세요.');
        scoreInput.focus();
        return;
    }

    // Update Echo
    termEcho.textContent = scoreVal;

    // Simulate C condition: if (score >= cutoff)
    termResult.className = 'term-line term-bold';
    if (scoreVal >= cutoff) {
        termResult.textContent = '합격을 축하합니다!';
        termResult.classList.add('success');
    } else {
        termResult.textContent = '불합격입니다 화이팅!!';
        termResult.classList.add('fail');
    }

    // Animation Effect
    const screen = document.getElementById('termScreen');
    screen.style.opacity = '0.4';
    setTimeout(() => {
        screen.style.opacity = '1';
    }, 120);
}

// 7. Checklist & Self-Scoring
function initChecklist() {
    updateScore();
}

function updateScore() {
    const checkboxes = document.querySelectorAll('.chk-cond');
    let totalScore = 24;
    let checkedCount = 0;

    checkboxes.forEach(chk => {
        if (chk.checked) {
            checkedCount++;
        } else {
            totalScore -= 2; // -2 points per missed condition
        }
    });

    if (totalScore < 0) totalScore = 0;

    const scoreNum = document.getElementById('currentScore');
    const scoreTitle = document.getElementById('scoreTitle');
    const scoreDesc = document.getElementById('scoreDesc');

    if (scoreNum) scoreNum.textContent = totalScore;

    if (totalScore === 24) {
        scoreTitle.textContent = '🎉 완벽합니다! 만점(24점) 예상';
        scoreDesc.textContent = '모든 6대 조건을 충족하여 감점 요인이 전혀 없습니다.';
        scoreTitle.style.color = 'var(--accent-green)';
    } else if (totalScore >= 18) {
        scoreTitle.textContent = `⚠️ 주의! 예상 점수 ${totalScore}점 (-${24 - totalScore}점 감점)`;
        scoreDesc.textContent = '체크되지 않은 항목을 수정하면 만점을 받을 수 있습니다.';
        scoreTitle.style.color = 'var(--accent-yellow)';
    } else {
        scoreTitle.textContent = `🚨 위험! 예상 점수 ${totalScore}점 (-${24 - totalScore}점 감점)`;
        scoreDesc.textContent = '필수 조건들을 놓쳤습니다. 단계별 가이드를 다시 점검하세요!';
        scoreTitle.style.color = 'var(--accent-red)';
    }
}
