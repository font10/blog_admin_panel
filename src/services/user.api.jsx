import axios from 'axios'

export const userAuthRequest = async(data, isSignUp) => {
  const res = await axios
    .post(`http://localhost:5000/user/${isSignUp ? "login" : "signup" }`, {
      username: isSignUp ? "" : data.username,
      email: data.email,
      password: data.password
    })
    .catch((err) => console.log(err))

    if(res.status !== 200 && res.status !== 201 ) {
      console.log("Unexpected Error")
    }
  
    return res
}

export const editUser = async(token, id, editUser) => {
  console.log(id)
  const { data } = await axios.patch(('http://localhost:5000/user/' + id), editUser, { headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }} )
  return data
}
