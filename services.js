
function checkIsNotBlank(string) {

  switch (string) {
    case "":
    case undefined:
    case null:
      return false
    default:
      return true
  }
}

function checkBody(expectedBodyKeys, receivedBody) {

  let bodyKeys = Object.keys(receivedBody)

  return bodyKeys.every(key => expectedBodyKeys.includes(key));

}

const validationServices = {
  checkIsNotBlank,
  checkBody
}

export default validationServices