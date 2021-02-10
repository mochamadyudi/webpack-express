const express =require('express')
const app = express()
require('dotenv').config()
const path = require('path')
const cookieParser  = require('cookie-parser')
const csrf  = require('csurf')
const session   = require('express-session')
const csrfProtection = csrf({cookie:true})
//=====SET VIEW ENGINE
// app.set('views engine','ejs')
//=====SET FLASH
app.use(cookieParser())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin",  "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", 'GET, POST');
    res.header("Access-Control-Allow-Credentials", 'true');
    next();
});

//==========SET SESSION
app.use(session({
    secret:'MySuperSecret',
    resave: true,
    saveUninitialized:true
}))

//================================SESSION PAGE
app.use((req,res,next)=> {
    let ses = req.session
    if  (
        ses.tokens === undefined ||
        ses.user === undefined ||
        ses.profile === undefined ||
        ses.listrik === undefined ||
        ses.transaksi === undefined ||
        ses.errors === undefined ||
        ses.any === undefined ||
        ses.msisdn === undefined ||
        ses.email === undefined
    ){
        ses.tokens = null
        ses.user = {
            isAuthenticated: false,
            msg: ""
        }
        ses.search = {
            nik:'',
            listrik:{
                no_meter:'',
                no_pelanggan: ''
            },
            perusahaan:{
                nama:{
                    id_perseroan:'',
                    keyword:''
                },
                saham:{
                    id_perseroan:'',
                    keyword:''
                },
                yayasan:{
                    keyword:'',
                    id:''
                },
                cv:{
                    keyword:'',
                    id:''
                }
            }
        }
        ses.profile = {
            profiles: {
                data:[],
                advanced:{
                    status:false,
                    data:[],
                    form:{
                        nama_lengkap:'',
                        nama_lengkap_method:'',
                        agama:'',
                        alamat:'',
                        tanggal:'',
                        bulan:'',
                        tempat_lahir:'',
                        tahun:'',
                        jenis_kelamin:'',
                        nama_ibu_kandung:'',
                        nama_ayah_kandung:'',
                        nama_ibu_kandung_method:'',
                        nama_ayah_kandung_method:'',
                        provinsi:'',
                        kecamatan:'',
                        desa:'',
                        nama_jalan:'',
                        pekerjaan:''
                    },
                    links:[]
                }
            },
            detail: {
                images: "",
                contact: [],
                norek:[],
                npwp:[],
                note:"",
                biodata: {},
                kendaraan: [],
                keluarga: [],
                pekerjaan: [],
                slik: [],
                annual:[],
                saham:[],
                transaksi: {
                    mencurigakan: {
                        data:[]
                    },
                    tunai:{
                        bio:{
                            nama_lengkap: '',
                            no_ktp:'',
                            npwp: '',
                            no_telp1: '',
                            no_telp2: '',
                            no_telp3: ''
                        },
                        data: []
                    }
                },
                pertanahan: [],
                listrik: []
            }
        }
        ses.transaksi = {
            status: false,
            mencurigakan: {
                data:[]
            },
            tunai:{
                status:false,
                bio:{
                    nama_lengkap: '',
                    no_ktp:'',
                    npwp: '',
                    no_telp1: '',
                    no_telp2: '',
                    no_telp3: ''
                },
                data: []
            },
            nik:{
                data:{},
                status:false
            },
            norek:{
                status:false,
                data:[]
            }
        }
        ses.perusahaan = {
            cv:{
                errors:{
                    status: false,
                    alertType:"",
                    msg:""
                },
                status:false,
                data: [],
                links:[],
                detail:{
                    data:{},
                    status:false
                }
            },
            saham: {
                errors:{
                    status: false,
                    alertType:"",
                    msg:""
                },
                status: false,
                data:[],
                detail:{
                    status:false,
                    data:{},
                    karyawan:[]
                }
            },
            nama:{
                errors:{
                    status: false,
                    alertType:"",
                    msg:""
                },
                status: false,
                links:[],
                data: [],
                detail:{
                    status:false,
                    data: {},
                    karyawan:[]
                }
            },
            yayasan: {
                errors:{
                    status: false,
                    alertType:"",
                    msg:""
                },
                status: false,
                data: [],
                links: [],
                detail:{
                    data:[],
                    status:false
                }
            },
            data: []
        }
        ses.any = {
            errors:{
                status:false,
                alertType: '',
                msg: ""
            },
            status: false,
            detail: {
                profile:{
                    status:false,
                    data:[],
                    links:[]
                },
                bpn: {
                    status:false,
                    data:[],
                    links:[]
                },
                perseroan:{
                    status:false,
                    data:[],
                    links:[]
                },
                msisdn:{
                    status:false,
                    data:[],
                    links:[]
                },
                kendaraan:{
                    status:false,
                    data:[],
                    links:[]
                },
                transaksi:{
                    status:false,
                    data:[],
                    links:[]
                },
                perusahaan:{
                    status:false,
                    data:[],
                    links:[]
                },
                debt:{
                    status:false,
                    data:[],
                    links:[]
                },
                listrik:{
                    status:false,
                    data:[],
                    links:[]
                }
            }
        }
        ses.msisdn = {
            status: false,
            errors:{
                status:false,
                alertType:'',
                msg:''
            },
            links: [],
            data: []
        }
        ses.email = {
            status: false,
            errors:{
                status:false,
                alertType:'',
                msg:''
            },
            links: [],
            data: []
        }
        ses.errors = {
            status: false,
            type:"",
            msg:""
        }
        req.session.kendaraan = {
            status:false,
            errors:{
                status:false,
                alertType:'',
                msg:''
            },
            data:[],
            nopol:{
                status:false,
                data:{}
            }
        }
        ses.listrik = {
            nik:{
                status: false,
                data: [],
                errors:{
                    status:false,
                    alertType: "",
                    msg:""
                }
            },
            pelanggan:{
                status:false,
                errors:{
                    status:false,
                    alertType: "",
                    msg:""
                },
                data: []
            },
            meter: {
                status: false,
                errors:{
                    status:false,
                    alertType: "",
                    msg:""
                },
                data: []
            }
        }
        ses.slik = {
            data: [],
            status:false
        }
    }
    next()
})

app.disable('x-powered-by')

app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res)=> {
    const filePath          = path.join(__dirname,"views","index.html")
    res.sendFile(filePath)
})
app.get('/profile', (req,res)=> {
    const filePath          = path.join(__dirname,"views","profile","profile.html")
    res.sendFile(filePath)
})
app.get('/profile/advanced',(req,res)=> {
    const filePath          = path.join(__dirname,"views","profile","advanced.html")
    res.sendFile(filePath)
})
app.get('/csrf' , csrfProtection,(req,res)=> {
    let tokens = req.csrfToken()
    req.session.tokens = tokens
    res.json({_csrf: tokens})
})

app.listen(5004, ()=>{
    console.log('App is running on port 5003')
})