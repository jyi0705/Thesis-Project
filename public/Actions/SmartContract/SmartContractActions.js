export const clickDocumentation = link => {
  return {
    type: "SMART_CONTRACT_CLICKED",
    payload: link
  }
};