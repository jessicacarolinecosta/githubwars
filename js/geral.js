document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById('btn').addEventListener('click', getDados);
    var usuario1Info, usuario2Info, usuario1Stars, usuario2Stars;

    function getDados() {

        let usuario1 = document.getElementById('inp').value;
        let usuario2 = document.getElementById('inp2').value;

        if (usuario1 != '' && usuario2 != '' && usuario1 != usuario2) {

            getInfo(usuario1, (usuario, estrelas) => {
                usuario1Info = usuario;
                usuario1Stars = estrelas;
                getInfo(usuario2, (usuario, estrelas) => {
                    usuario2Info = usuario;
                    usuario2Stars = estrelas;
                    preparaDados();
                });
            });
        }
        else {
            alert("Usuários identicos ou campos vazios!");
        }

    }

    function preparaDados() {
        var objUsuario1 = {
            "usuario": usuario1Info.login,
            "avatar": usuario1Info.avatar_url,
            "seguidores": usuario1Info.followers,
            "seguindo": usuario1Info.following,
            "repositorios": usuario1Info.public_repos,
            "gists": usuario1Info.public_gists,
            "estrelas": usuario1Stars,
            "data_criacao": usuario1Info.created_at,
            "pontos": 0
        }

        var objUsuario2 = {
            "usuario": usuario2Info.login,
            "avatar": usuario2Info.avatar_url,
            "seguidores": usuario2Info.followers,
            "seguindo": usuario2Info.following,
            "repositorios": usuario2Info.public_repos,
            "gists": usuario2Info.public_gists,
            "estrelas": usuario2Stars,
            "data_criacao": usuario2Info.created_at,
            "pontos": 0
        }

        objUsuario1.pontos = calculaPontos(objUsuario1);
        objUsuario2.pontos = calculaPontos(objUsuario2);

        var ano1 = 2018 - objUsuario1.data_criacao.substring(0, 4);
        var ano2 = 2018 - objUsuario2.data_criacao.substring(0, 4);

        document.querySelector('#pontos1').innerText = objUsuario1.pontos;
        document.querySelector('#pontos2').innerText = objUsuario2.pontos;
        document.querySelector('#img1').setAttribute('src', objUsuario1.avatar);
        document.querySelector('#img2').setAttribute('src', objUsuario2.avatar);
        document.querySelector('#seguidores1').innerText = objUsuario1.seguidores;
        document.querySelector('#seguindo1').innerText = objUsuario1.seguindo;
        document.querySelector('#repositorios1').innerText = objUsuario1.repositorios;
        document.querySelector('#gists1').innerText = objUsuario1.gists;
        document.querySelector('#estrelas1').innerText = objUsuario1.estrelas;
        document.querySelector('#ano1').innerText = ano1;
        document.querySelector('#seguidores2').innerText = objUsuario2.seguidores;
        document.querySelector('#seguindo2').innerText = objUsuario2.seguindo;
        document.querySelector('#repositorios2').innerText = objUsuario2.repositorios;
        document.querySelector('#gists2').innerText = objUsuario2.gists;
        document.querySelector('#estrelas2').innerText = objUsuario2.estrelas;
        document.querySelector('#ano2').innerText = ano2;
        document.querySelector('body').classList.add('slider');

        document.querySelector('#tseguidores1').innerText = objUsuario1.seguidores * 10;
        document.querySelector('#tseguindo1').innerText = objUsuario1.seguindo * 5;
        document.querySelector('#trepositorios1').innerText = objUsuario1.repositorios * 20;
        document.querySelector('#tgists1').innerText = objUsuario1.gists * 5;
        document.querySelector('#testrelas1').innerText = objUsuario1.estrelas * 10;
        document.querySelector('#tano1').innerText = ano1 * 5;
        document.querySelector('#tseguidores2').innerText = objUsuario2.seguidores * 10;
        document.querySelector('#tseguindo2').innerText = objUsuario2.seguindo * 5;
        document.querySelector('#trepositorios2').innerText = objUsuario2.repositorios * 20;
        document.querySelector('#tgists2').innerText = objUsuario2.gists * 5;
        document.querySelector('#testrelas2').innerText = objUsuario2.estrelas * 10;
        document.querySelector('#tano2').innerText = ano2 * 5;

        if (objUsuario1.pontos > objUsuario2.pontos) {
            document.querySelector('.vencedor1').classList.add('d-none');
        }

        else {
            document.querySelector('.vencedor2').classList.add('d-none');
        }

        console.log(objUsuario1);
        console.log(objUsuario2);

    }

    function getInfo(usuario, insertInfo) {
        var estrelas = 0;
        var xhttpInfo = new XMLHttpRequest();
        var xhttpStars = new XMLHttpRequest();

        xhttpInfo.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                xhttpStars.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var repos = JSON.parse(xhttpStars.responseText);
                        repos = repos.reduce((total, obj) => obj.stargazers_count + total, 0);
                        insertInfo(JSON.parse(xhttpInfo.responseText), repos);
                    }
                }
                xhttpStars.open("GET", "https://api.github.com/users/" + usuario + "/repos");
                xhttpStars.send();
            }
        }

        xhttpInfo.open("GET", "https://api.github.com/users/" + usuario);
        xhttpInfo.send();
    }

    function calculaPontos(obj) {

        //retorna data criacao
        var ano = 2018 - obj.data_criacao.substring(0, 4);

        //retorna total de pontos
        var totalPontos = 0
        totalPontos = (obj.repositorios * 20) +
            (obj.seguidores * 10) +
            (obj.seguindo * 5) +
            (obj.estrelas * 10 + (obj.gists * 5) +
                (ano * 5));
        return totalPontos;
    }
});