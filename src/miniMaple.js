class exp1 {
    constructor(coeff, sym, exp) {
      this.coeff = coeff; // коэффициент (например 4)
      this.sym = sym;     // переменная (например x)
      this.exp = exp;     // степень (например 3)
    }
  
    // Метод для вычисления производной данного монома
    diff(variable) {
      if (this.sym !== variable) {
        // Если дифференцируем по другой переменной — производная = 0
        this.coeff = 0;
        this.exp = 0;
        return;
      }
  
      if (this.exp === 0) {
        this.coeff = 0;
        this.exp = 0;
      } else {
        this.coeff *= this.exp;
        this.exp -= 1;
      }
    }
  
    // Преобразование обратно в строку
    toString() {
        let out="";
        if (this.coeff === 0) {return '0'}
        else if (this.exp === 0) {out= `${this.coeff}`}
        else if (this.exp === 1) {out= `${this.coeff}*${this.sym}`}
        else out=`${this.coeff}*${this.sym}^${this.exp}`;
        if (this.coeff>0) {return "+"+out}
        else return out;
    }
  }
  
  class MiniMaple {
    constructor() {
      this.terms = []; // сюда сохраняем объекты exp1
    }
  
    // Разбор строки выражения на моночлены
    parse(expr) {
        this.terms = []; // очищаем старые термы
    
        // Убираем пробелы
        expr = expr.replace(/\s+/g, '');
    
        // Разбиваем по + и -, сохраняя знак
        if (!expr.startsWith('+') && !expr.startsWith('-')) expr = '+' + expr;
        const parts = expr.match(/[+-][^+-]+/g); // каждый терм с его знаком
    
        for (let part of parts) {
          // Ищем символ переменной
          const symMatch = part.match(/[a-zA-Z]/);
          const sym = symMatch ? symMatch[0] : '';
    
          // Коэффициент
          let coeff;
          if (sym) {
            const coeffMatch = part.match(/([+-]?)(\d*)\*?[a-zA-Z]/); 
            // ([+-]?) — знак
            // (\d*) — цифры перед буквой
            if (coeffMatch) {
              const sign = coeffMatch[1] === '-' ? -1 : 1;
              coeff = coeffMatch[2] ? parseInt(coeffMatch[2]) * sign : sign; // если цифр нет → ±1
            } else {
              coeff = part.startsWith('-') ? -1 : 1;
            }
          } else {
            // число без переменной
            const coeffMatch = part.match(/([+-]?\d+)/);
            coeff = coeffMatch ? parseInt(coeffMatch[1]) : 0;
          }
          
    
          // Степень
          const expMatch = part.match(/\^(\d+)/);
          const exp = expMatch ? parseInt(expMatch[1]) : (sym ? 1 : 0);
    
          const term = new exp1(coeff, sym, exp);
          this.terms.push(term);
        }
      }
    
  
    // Производная всего выражения
    diff(expr, variable) {
      this.parse(expr);
        this.terms.forEach(t => t.diff(variable));
      const result = this.terms.map(t => t.toString()).filter(s => s !== '0').join('');
      return result.startsWith('+') ? result.slice(1) : result || '0';      
    }
  }
  
  export { MiniMaple };
  
