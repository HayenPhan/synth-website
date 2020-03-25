import axios from 'axios';

// GET
export const getStudents = () => {
    return axios
    .get('/instruments', {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      console.log('haallopdan');
        return res.data
    })
}

// CREATE

export const addStudent = (name, user, teacher) => {
    return axios
        .post('/instruments',
        {
            name: name,
            user: user,
            teacher: teacher
        },
        {
            headers: {'Content-Type': 'application/json'}
        }
      )
      .then(res => {
          console.log(res)
      })
}

// DELETE

export const deleteStudent = id => { // Klopt miss niet
    axios.delete(`instruments/${id}`, {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE

export const updateStudent = (name, user, teacher, id) => {    // Klopt miss niet
    return axios
    .put(`instruments/${id}`,
    {
        name: name,
        user: user,
        teacher: teacher
    },
    {
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
}
