const buildByteArray = (decodedString, length) => {
  const buffer = new ArrayBuffer(length)
  const array = new Uint8Array(buffer)
  for (let i = 0; i < length; i++) {
    array[i] = decodedString.charCodeAt(i)
  }
  return array
}

const createBlob = (byteArray) => {
  return new Blob([byteArray], { type: 'application/pdf' })
}

export const base64ToBlob = (base64String) => {
  const decodedString = atob(base64String)
  const byteArray = buildByteArray(decodedString, decodedString.length)
  return byteArray ? createBlob(byteArray) : null
}
