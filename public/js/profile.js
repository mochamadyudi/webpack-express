(() => {
    var e = {token: "", data: [], token_status: !1}, n = document.querySelector("#form--profile-nik"),
        t = document.getElementById("btn--profile-nik"), s = document.getElementById("msg--profile-nik"),
        o = "http://" + window.location.host;
    window.addEventListener("load", (function () {
        axios.get("http://localhost:5004/csrf", {headers: {"Content-Type": "application/json"}}).then((function (n) {
            200 === n.status && (console.log(n.data._csrf), e.token = n.data._csrf, e.token_status = !0)
        })).catch((function (n) {
            e.token_status = !1
        }))
    })), n.addEventListener("submit", (function (n) {
        n.preventDefault();
        var i = document.getElementById("nik--input");
        t.innerHTML = '<span class="fas fa-spinner fa-spin" style="font-size: 20px"></span>', i.value.length >= 3 ? axios.post("http://192.168.88.102:5003/profile/nik", {
            _csrf: e.token,
            nik: i.value
        }, {headers: {"Content-Type": "application/json"}}).then((function (e) {
            200 === e.status && (e.data.status ? setTimeout((function () {
                window.location.href = "/profile/result"
            }), 2e3) : (s.style.display = "flex", s.innerHTML = '<span style="color:red;">DATA TIDAK DITEMUKAN!</span>', setTimeout((function () {
                s.style.display = "none", t.innerHTML = "CARI"
            }), 2e3)))
        })).catch((function (e) {
            s.style.display = "flex", s.innerHTML = '<span style="color:red;">DATA TIDAK DITEMUKAN!</span>', setTimeout((function () {
                s.style.display = "none", t.innerHTML = "CARI"
            }), 2e3)
        })) : (s.style.display = "flex", s.innerHTML = '<span style="color:red;">Kurang dari 3 Angka</span>', i.style.border = "1px solid red", setTimeout((function () {
            s.style.display = "none", i.style.border = "1px solid #262626", t.innerHTML = "CARI"
        }), 1e3))
    }))
})();