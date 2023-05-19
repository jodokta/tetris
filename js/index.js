const question = document.querySelector('.question-mark');
    const guide = document.querySelector('.guide');
    question.addEventListener('mouseover', ()=>{
      guide.classList.remove('hidden');
    });
    question.addEventListener('mouseout', ()=>{
        guide.classList.add('hidden');
      });

const buttons = document.querySelectorAll('a');

