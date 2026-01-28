const bcrypt = require('bcryptjs');
const password = 'Ubuntu2024!';

bcrypt.hash(password, 10)
  .then(hash => {
    console.log('Password:', password);
    console.log('Hash:', hash);
    
    // Test it
    return bcrypt.compare(password, hash);
  })
  .then(isMatch => {
    console.log('Match:', isMatch);
  })
  .catch(console.error);
