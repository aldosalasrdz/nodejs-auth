const bcrypt = require('bcrypt')

async function verifyPassword () {
  const myPassword = 'admin 123 &'
  const hash = '$2b$10$QM3IYBxTsu/2Id3fJ62jfeazQIDG1QeEEy7dM83AkTlqTld00BDS6'
  const isMatch = await bcrypt.compare(myPassword, hash)
  console.log(isMatch)
}

verifyPassword()
