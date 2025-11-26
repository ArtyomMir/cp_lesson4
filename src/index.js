import { MiniMaple } from './miniMaple.js';

const mm = new MiniMaple();

// Обработчик нажатия кнопки
document.getElementById('run').addEventListener('click', () => {
  const expr = document.getElementById('expr').value.trim();       // выражение
  const variable = document.getElementById('variable').value.trim(); // переменная

  if (!expr || !variable) {
    document.getElementById('result').textContent = 'Введите выражение и переменную';
    return;
  }

  try {
    const result = mm.diff(expr, variable);
    document.getElementById('result').textContent = result;
  } catch (err) {
    document.getElementById('result').textContent = 'Ошибка: ' + err.message;
  }
});
