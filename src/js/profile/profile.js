
const state = {
    'token': '',
    'data':[],
    'token_status':false
}
const FormNik     = document.querySelector('#form--profile-nik')
const BtnNik      = document.getElementById('btn--profile-nik')
const MsgNik      = document.getElementById('msg--profile-nik')
const url = 'http://'+window.location.host
window.addEventListener('load',()=> {
    axios.get('http://localhost:5004/csrf',{headers:{"Content-Type":"application/json"}})
        .then((response)=> {
            if(response.status === 200){
                console.log(response.data._csrf)
                state.token = response.data._csrf
                state.token_status = true
            }
        })
        .catch((err)=> {
            state.token_status = false
        })
})

FormNik.addEventListener('submit',  (e)=>{
    e.preventDefault();
    const Input     = document.getElementById('nik--input')
    BtnNik.innerHTML = `<span class="fas fa-spinner fa-spin" style="font-size: 20px"></span>`
    if(Input.value.length >= 3){
         axios.post(url, {_csrf: state.token,nik:Input.value},{headers:{"Content-Type":"application/json"}})
            .then((response)=> {
                if (response.status === 200){
                    if (response.data.status){
                        setTimeout(()=> {
                            window.location.href = "/profile/result"
                        },2000)
                    }else{
                        MsgNik.style.display = 'flex'
                        MsgNik.innerHTML = `<span style="color:red;">DATA TIDAK DITEMUKAN!</span>`

                        setTimeout(()=> {
                            MsgNik.style.display = 'none'
                            BtnNik.innerHTML = `CARI`
                        },2000)
                    }
                }
            })
            .catch((err)=> {
                MsgNik.style.display = 'flex'
                MsgNik.innerHTML = `<span style="color:red;">DATA TIDAK DITEMUKAN!</span>`

                setTimeout(()=> {
                    MsgNik.style.display = 'none'
                    BtnNik.innerHTML = `CARI`
                },2000)
            })
    }else{
        MsgNik.style.display = 'flex'
        MsgNik.innerHTML = `<span style="color:red;">Kurang dari 3 Angka</span>`
        Input.style.border = '1px solid red'

        setTimeout(()=> {
            MsgNik.style.display = 'none'
            Input.style.border = '1px solid #262626'
            BtnNik.innerHTML = `CARI`
        },1000)
    }

})