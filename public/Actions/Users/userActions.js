// adduser
export function addUser(walletId, poolId, deposit) {
  return {
    type: 'ADD_USER',
    walletId,
    poolId,
    deposit
  }
}

// add pool
export function addPool(total, midAge, size){
  return {
    type: 'ADD_POOL',
    total,
    midAge,
    size
  }
}

// remove user

export function removeUser(poolId, walletId) {
  return {
    type: 'REMOVE_USER',
    walletId,
    postId
  }
}