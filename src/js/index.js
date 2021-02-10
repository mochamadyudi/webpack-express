const axios = require('axios')
    const state = {
        'token': '',
        'data':[],
        'menu': [
            {
                icons:["user"],
                colors:'#AE0C68',
                name:'profil',
                url:'/profile',
            },
            {
                icons:["building"],
                name:'Perusahaan',
                colors:'#239A9A',
                url:'/perusahaan',
            },
            {
                icons:["car"],
                colors:'#2ECC2E',
                name:'Kendaraan',
                url:'/kendaraan',
            },
            {
                icons:["credit-card"],
                colors:'#00A8A8',
                name:'Transaksi',
                url:'/transaksi',
            },
            {
                icons:["search"],
                name:'Cari Apapun',
                colors:"red",
                url:'/any',
            },
            {
                icons:["mobile"],
                colors: "#FF933A",
                name:'msisdn',
                url:'/msisdn',
            },
            {
                icons:["envelope"],
                colors: "#239A9A",
                name:'email',
                url:'/email',
            },
            {
                icons:["file-invoice-dollar"],
                colors: "#33DE0F",
                name:'Debitur Buruk',
                url:'/slik',
            },
            {
                icons:["bolt"],
                colors: "#FFA500",
                name:'listrik',
                url: '/listrik'
            }
        ],
        'token_status':false
    }
    axios.get('http://localhost:5004/csrf',{headers:{"Content-Type":"application/json"}})
    .then((response)=> {
        if(response.status === 200){
            state.token = response.data._csrf
            state.token_status = true
        }
    })
    .catch((err)=> {
        state.token_status = false
    })

    const layout = document.getElementById('wrapper')
    const LayoutWrapper = ()=> {
        layout.innerHTML = ''
        for (let i =0;i<9;i++){
            const a     = document.createElement('a')
            a.className = 'layout-menu-item'
            a.href = state.menu[i].url
            a.innerHTML = `
                <div class="box-menu">
                    <span class="fas fa-${state.menu[i].icons}" style="color:${state.menu[i].colors};pointer-events: none"></span>
                    <p style="color:${state.menu[i].colors}">${state.menu[i].name}</p>
                </div>
            `
            layout.appendChild(a)
        }
    }
LayoutWrapper()