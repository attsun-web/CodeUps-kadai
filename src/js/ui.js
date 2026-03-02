document.addEventListener('DOMContentLoaded', () => {
    // モーダル制御
    const modal = document.querySelector('.js-modal');
    const modalImage = document.querySelector('.js-modal-image');
    const openButtons = document.querySelectorAll('.js-modal-open');
    const closeButtons = document.querySelectorAll('.js-modal-close');

    // 開く
    openButtons.forEach(button => {
        button.addEventListener('click', () => {
        const imageSrc = button.dataset.modalImg;

        modalImage.src = imageSrc;
        modal.classList.add('is-open');
        document.body.classList.add('is-modal-open');
        document.body.style.overflow = 'hidden';
        });
    });

    // 閉じる
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
        modalImage.removeAttribute('src');
    });

    // ESCキー
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('is-open');
        modalImage.src = '';
        document.body.classList.remove('is-modal-open');
        document.body.style.overflow = '';
    }

    // タブ切り替え
    document.querySelectorAll('.tab').forEach(tab => {
    const buttons = tab.querySelectorAll('.tab__button');
    const panels = tab.querySelectorAll('.tab__panel');

        buttons.forEach(button => {
        button.addEventListener('click', () => {
            // ボタン切り替え
            buttons.forEach(btn => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-selected', 'false');
            });

            button.classList.add('is-active');
            button.setAttribute('aria-selected', 'true');

            // パネル切り替え
            panels.forEach(panel => panel.classList.remove('is-active'));
            tab.querySelector(`#${button.dataset.tab}`).classList.add('is-active');
        });
        });
    });

    // アーカイブの開閉
    document.querySelectorAll('.archive__year-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
        btn.closest('.archive__year').classList.toggle('is-open');
        });
    });
});

jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

    // FAQの開閉
    $('.js-faq-toggle').on('click', function () {
        const $btn = $(this);
        const $faqItem = $btn.closest('.faq-item');
        const $answer = $faqItem.find('.faq-answer');

        if ($btn.hasClass('is-open')) {
        // close
        $answer.stop(true, true).slideUp(300);
        $btn.removeClass('is-open');
        } else {
        // open
        $answer.stop(true, true).slideDown(300);
        $btn.addClass('is-open');
        }
    });
});
