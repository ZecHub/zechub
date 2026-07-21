'use client';

import { useState } from 'react';
import { useSound } from '@/hooks/useSound';

export function Calculator() {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);
  const { playClick } = useSound();

  const inputDigit = (digit: string) => {
    playClick();
    if (waitingForSecond) {
      setDisplay(digit);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    playClick();
    if (waitingForSecond) {
      setDisplay('0.');
      setWaitingForSecond(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    playClick();
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const handleOperator = (nextOperator: string) => {
    playClick();
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecond(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second !== 0 ? first / second : 0;
      default: return second;
    }
  };

  const handleEquals = () => {
    playClick();
    if (operator === null || firstOperand === null) return;

    const inputValue = parseFloat(display);
    const result = calculate(firstOperand, inputValue, operator);

    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const Button = ({ label, onClick, className = '', wide = false }: {
    label: string;
    onClick: () => void;
    className?: string;
    wide?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`
        btn-window p-2
        ${wide ? 'col-span-2' : ''}
        ${className}
      `}
      style={{ fontSize: 'var(--font-size-button)' }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col h-full p-2 gap-2">
      {/* Display */}
      <div
        className="
          bg-[var(--bg-desktop)]
          border-2 border-[var(--border-dark)]
          p-2 text-right
          text-[var(--accent-gold)]
          overflow-hidden
        "
        style={{ fontSize: 'var(--font-size-value)', fontFamily: 'var(--font-vt323)' }}
      >
        {display}
      </div>

      {/* Buttons Grid */}
      <div className="grid grid-cols-4 gap-1 flex-1">
        <Button label="C" onClick={clear} className="text-[var(--accent-orange)]" />
        <Button label="/" onClick={() => handleOperator('/')} className="text-[var(--text-amber)]" />
        <Button label="*" onClick={() => handleOperator('*')} className="text-[var(--text-amber)]" />
        <Button label="-" onClick={() => handleOperator('-')} className="text-[var(--text-amber)]" />

        <Button label="7" onClick={() => inputDigit('7')} className="text-[var(--text-green)]" />
        <Button label="8" onClick={() => inputDigit('8')} className="text-[var(--text-green)]" />
        <Button label="9" onClick={() => inputDigit('9')} className="text-[var(--text-green)]" />
        <Button label="+" onClick={() => handleOperator('+')} className="text-[var(--text-amber)]" />

        <Button label="4" onClick={() => inputDigit('4')} className="text-[var(--text-green)]" />
        <Button label="5" onClick={() => inputDigit('5')} className="text-[var(--text-green)]" />
        <Button label="6" onClick={() => inputDigit('6')} className="text-[var(--text-green)]" />
        <Button label="=" onClick={handleEquals} className="text-[var(--accent-gold)] row-span-2" />

        <Button label="1" onClick={() => inputDigit('1')} className="text-[var(--text-green)]" />
        <Button label="2" onClick={() => inputDigit('2')} className="text-[var(--text-green)]" />
        <Button label="3" onClick={() => inputDigit('3')} className="text-[var(--text-green)]" />

        <Button label="0" onClick={() => inputDigit('0')} className="text-[var(--text-green)]" wide />
        <Button label="." onClick={inputDecimal} className="text-[var(--text-green)]" />
      </div>
    </div>
  );
}
