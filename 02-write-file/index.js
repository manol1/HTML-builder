const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'enteredText.txt'));
stdout.write('Enter your text, please:\n');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    stdout.write('Goodbye!');
    process.exit();
  } else {
    output.write(data);
    stdout.write('Enter more text or enter "exit" \n');
  }
});

process.on('SIGINT', () => {
  stdout.write('Goodbye!');
  process.exit();
});