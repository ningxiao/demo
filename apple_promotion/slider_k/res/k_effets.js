//-------------------------------------------------------------
//  Nom Document : k_effets
//  Auteur       : kazma (Kamel.A)
//  Objet        : colection d'effet de transition
//  Creation     : 24.01.2013
//-------------------------------------------------------------
//  Mise à Jour  : 26.02.2013
//  Objet        : ajout d'effets
//-------------------------------------------------------------
//-(*)------------------


var ch=1;

var keffet={
ima:null,
tefet:0,
chemin:'slider_k/images/',				//repertoire des images
k_vitesse:0,					//vitesse des effets (basé sur une image en 4/3) en fonction de la taille
contexte:null,					// du canvas initialisé a la lecture de la premiere image 
cvs:null,
swii:1,
tbeffet:new Array(),

}

function alea(){

	if(keffet.tbeffet.length==0){
		for(var i=1;i<=40;i++){
			keffet.tbeffet.push(i);
		}
	}

	if(keffet.tbeffet.length==1){
		window['draw'+keffet.tbeffet[0]]();
		keffet.tbeffet.pop();
	}
	else{
		var spl=Math.round(Math.random()*(keffet.tbeffet.length-1));
		console.log("执行特性",'draw'+keffet.tbeffet[spl]);
		window['draw'+keffet.tbeffet[spl]]();
		keffet.tbeffet.splice(spl,1);
	}
}


function swiwi(){

	window['draw'+keffet.swii]();
	keffet.swii++;

	if(keffet.swii==40){
		keffet.swii=1;
	}
}


function effet(mago){

	var cs=document.getElementById('cs');

	if(!document.getElementById('kprog')){

		var pro=document.createElement('img');
		pro.src="data:image/gif;base64,R0lGODlhYgALAMZ5AGxqbG1qbG1rbG1rbW5rbW5sbW5sbm9sbm9tbm9tb3BtbnBtb3BubnBucHFub3Fvb3JvcHNvcHRwcXRxcXdzc3h0dHp1dXt2dnx3dn96eH96eYB6eYR+fIyHhY2IhpCKiJyWlJ6amJ6bmaKjoaOkoqOlo6SmpKepp6iqqK2vrbS2tLy+vL2/vcDAwMDBwMHBwcPBv8HCwcLCwsLDwsfCwMPDw8PEw8TExMXGxcbGxszGxMjHyMjIyMnIyc3Ix8nJyc3IyMvKy87Kyc/KyM/KycvLy8/KysvMy8/Ly87Mzs/MzdDMy9DMzNHMy87NztDNzdHNzNHNzs/Oz9DO0NLP0NPPztPPz9TQ0NLR0tTR0NTS1NXS09bS09XT09LU0tXT1dbU1tfU1djU1NfV19jW19jW2NjX2NnX2dnY2drY2tvY2dvZ29za3N7c3tzd3N/d3+De4ODf4OHf4ePh4+Pi4+Ti5OPj4+bk5ubl5v///////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQB/ACwAAAAAYgALAAAHqIAAgoOEHH9/hIkAh4qEhxyNg4yRAIaIlJORj5SclZmNn4qbmJeRlpyhiaOdjaekqH+Qr5SumqWgsaymqY63ormzu76qw72yuom1uLDHy7S8ksXRzciCyr/MsJzXxNnVhdCC4YvAttvj6OXfntLi7eTU3c/v6fHI3L3e5vPapPa6+KLpcyasn61/lApYCyVgUIFJB3A1WzBIgYNUDRfSu5SRGDWKghYEAgAh+QQJCQB/ACwAAAAAYgALAAAHqIAggoOEJn9/AImKi4eLjgCHHI+MiJOJHI2WkJWWkZoAhKEghpyTmZ1/kpqnk5ilj6ywqZ+ihbGOt5SqqJ+un7mKnpq1g6S/r7izq8iLvsvHu5PEgsbPy9GyvcCJ25vYjtOj3ePKvJrO5qjfi+HV6abl8NrMwfTc8Y/TIu7y18fz//wNm8Yvm8B3j9D1U0eLIDloAS0pNMhwILGCySBak/jwYCIFihYEAgAh+QQJCQB/ACwAAAAAYgALAAAHuoAqgoOEK39/IImKi4cAjo+Qhx+QlACNlY8cl5iWf5yOhxyfAISlKoaIi6qbmKGjrJWanp+wlK6fpoWHqquznLe/vpiyr8KVwJi5g6i8jMa2f6K0z5DE08XSnMqCzM2JtZHRxaPWwdij26e73iDgj8jH1JnuoPL12cnb3d70nfjx5PoJFIcr3Tp+9vyN+1SuVUJ4lNLtazbwH7SADzNahCTxIEWNCzk1BDht46OOqRCeu8Zw4MpHCyAFAgAh+QQJCQB/ACwAAAAAYgALAAAH04BagoOEbH9/KomKi4cgjo+QhxwAlJWWh5aZAByYmpWdngCSoZSEpoKHi6oqjZCuo6Sgnpx/pKK1sX+TpKeEWKmriq2uj7Chspq0tsiZxp69gz3Awax/xJG6y7ihyrnau6HQg9PBw9fOmsyW3cfbnuiZ4lqGiNTV18XZ3qTs7+7p+sKJo2fvHj4Q8C79y9QP4Ddb8rSQW2WOWMJPC9epw/iQ18CJqipCEnGR0kZKDZtlxAjumTyQjKwdLHnLVkqFHQWKgylMJj6aJzcFHRqQ0gJLgQAAIfkECQkAfwAsAAAAAGIACwAAB9OAWoKDhGx/f4SJWocqjY6PhyYgk5SVhwCYmZoZl5qenZ6ZhxyhmoqJh6eDjI+tkZWwIKClHLOhtp9/pKWYqoKGiL6srY6vsZS4mrV/vJjJorrNAL5aYKnCf8SQf5LHk8+Yy9LgAKPS1IvBqsPaxt7k4s3k5s3UwNTsxO7H8PPM8tHq4VN3Kp8rbt6+/Qu1AEA8Xv528bJ3bV02bY32xeq3sFTEcwMHYsyIMCHHcR1vBZwYEttIFRphnQSIUmIpamkqFryIMaalhQ09PfSYMpfNUIEAACH5BAkJAH8ALAAAAABiAAsAAAfmgACCg4Qcf39aiYqLh4uOWocrKpOUlYcgmJmaJoeEngCdn4OHHKKmnoaIj4qNq4mHQZWyKpeatpx/p6C5p6S6uqmur6quhzizln+2t6GmzaK+v6bBwq3FfzHIlLXLmLi6z5/R0p/U18KQf0fak9zd3728zn+l5OXWq/iPh9ns7svw5oGjZ+8esXwH9/1pwY6Wsm7ewnmSSGhcQUHmEKI7NKPhP1slKI6SB43gxUEZFW78I8nfw24iRogUNHNXvZMAUjrSt5Olx5fvago1+WvCoAUYeTJK2LPIT4gRSYqTOpGoIKODAgEAIfkECQkAfwAsAAAAAGIACwAAB9yAAIKDhBx/f4SJAIdajY6Ph2yPk1qHKpeYmSuHIJ2en4eKhIccoqaJhoinjJSOka2uf5mzKpt/n7ggoat/pae/qb+ssK+wlbK0mLa5oKqmpL/Au89/xsdl1pbJl8vMndOi0NGmwbzZf5LG2tvd3uCK4uOK5dTn6cTI7Jzeus7hvfJE0ftn79w2bvvc+RMwiMAigAFRvUs0rFUxfAdrJWQ2cRTEiIMGwqum7k8bgwfbcfQ30hdIQSIpksR3z2K+ZCpzvTvg0WXAAjA7DqpIiWjRm8k26nRmYWSGX4EAACH5BAkJAH8ALAAAAABiAAsAAAfegACCg4Qcf3+EiQCHioSHbFqRkpOHk5ZabIcqm5ydhyCgoaKHHI2miYaIp4yrf5CXkpWwsX+dtiqforqkp70Aqb2spo+zkbKzcZq3nLm6oby+psCtwX/FxtbFmbXLm83OINDRitPDquavs8fq3N3fzuLjhcKN9IrExeuX293ef+DP/pSSh8peIoOOsuVTCItfv3e7BBIseK5exXuurum7pMzdP4DhJE4cVM5itXSwNk5y6BFkiHgTS2I8qZFhynbLII4SOXJAB4SDgApSGWmKFqJSePDomPMjQJgCCAUCACH5BAkJAH8ALAAAAABiAAsAAAfHgACCg4Qcf3+EiQCHioSHHI2DjJEAhn9amJmah5qdWocrKqKjpJSVk5GojY+mqoqWnpuXsZigpLcqppatiJSsvr2RsLSfs7SHMrillLvAvJDOzJzE08d/ycqiuq6J3I5/0KnBjcPWxMWh2bnS44rekuC828ax1fV/O+rrwu+C/YvxovGj58lewT8u9M2TByzcqnaJyt07Z0vdQoEPHbqDWMhgJ4+y0mW7KO4Zw4EUCX78I1LZoAODGAhqVrLhSXIgM+WsxVJfIAAh+QQJCQB/ACwAAAAAYgALAAAHwYAAgoOEHH9/hIkAh4qEhxyNg4yRAIaIlIdampuch2xJnKGUlZORpY2Po6eKlqp/oaGesJyjrZiXpn+Qt7WriZmzmodlwZq9uKjIiqm8lLa5xVrAxceurru51bfRh2PR2tm32MngyWzFw9/Ovo7Kv7rW6+7t3H/e1PLxuePL84PPyepF01Ku3zV9jQD2qwdGXSSF7w42G5CQnaRX6P58cUhg0AFBCiG0G9RR0MdF8Bp9nFSAokmQp04CWIkx2LRggQAAIfkECQkAfwAsAAAAAGIACwAAB7WAAIKDhBl/f4SJAIeKhIccjYOMkQAck5GXjYdsWp2en5SVmYqjiY+hpYSWiJSpkn+cn7Khq6ismH+QrbeNtbu2sbKetK6CxYu5tsS8pMymsMKglL64trrV08faf9HSkdSazo7Jv9nir8DdncvKu9fh7OW4wdHx2Ljvzfbwu/TC+/rctfu2LZ26RgkEgQuIb2Cvgv3UaRmkQNHCA+MGLSBkANm7AhqRDQIpaIBCVxtTbUTmT1YgACH5BAkJAH8ALAAAAABiAAsAAAetgACCg4Qcf3+EiQCHioSHHI2DjJEAhoiUk5GPlJyVmY2fipuYl5GWnKGJo52Np6Sof5CvlK6apaCxrKapjreiubO7vqrDvbK6ibW4sMfLtLySxdHNyILKv8ywnNfE2dWF0ILhi8C22+Po5d+e0uLt5NTdz+/p8cjcvd7m89qk9rr4oilqMK2fMIO4/iUqMIghu34IcFVQMGjBoAjkFFkUlOEQgUEB5BHaCI8SgUAAIfkECQkAfwAsAAAAAGIACwAAB6SAAIKDhBx/f4SJAIeKhIccjYOMkQCGiJSTkYcjIJ2en5SVmY2jio+hpYmWqJeafyafsSChq5itpH+QtrSpjremr7KglLWurLrGxL2Sv4mHsMKdvM2+x6zT17bQ0di7tsi43cmu28Li4d/ZkcXo5NHSytTM1t7ry4L3i8Hv58D0443Y+dP2blY8dbjADbQnD19DfeVkDQqgSKCzh6fqBczHcV+0QAAh+QQJCQB/ACwAAAAAYgALAAAHtYAAgoOEHH9/hIkAh4qEhxyNg4yRAIaIlIcgmpuchysqoKGilJWTkaaNj6Soiparf5yxIJ6itSqkrpiXp3+QurisiZmym7S2ocC7qcqKqr+UubzExX+fx6DJr6++vNm605rG197dutzL5Mvgs9XX2NDBjszCvdrw8/Lr4sfpzfiS9Z5FiqYO3D5b/ehtszcwHkB97dwllLdQYCOC/iBaGydowCCPpf4JcjgyYLmGIhfBMhjxWiAAIfkECQkAfwAsAAAAAGIACwAAB9CAAIKDhBx/f4SJAIeKhIccjYOMkQCGfyCYmZqHKp2en4dvWqOkpZSVk5GpjY+nq4qWmrIgnJ+2h2ylulqnlq6IlK3BwJGxs5m1tp64u6aUvsO/kNHPh8fIf8qgf83Oxa+J4I5/06rEjcbXydrM3bzV54rikuS/vdbXtNnane3d9/HCBRxXjtXAQemOrVN2yN0ogPaGFZR3UFDCWQtv/cnlDiI1cxMFAsynj1+/jQ49mpMW8dulfBm3OXwHYMAgBxbnCdK5qN5HdPjU7ePnr1kgACH5BAkJAH8ALAAAAABiAAsAAAfZgACCg4Qcf3+EiQCHioSHHI2DhyCUlZYmhyqam5yHWp+goYdsoaVakYKGiKiMrH+QrpayIJh/nLcqnqago7ugqACqwK2Rj8N/s5eZuJu6vodxvp/Awq7HsMXIyZS1zM1/0lqHaOHUxI3nisax27TL3s67h3TlqNXZ18ft7rbeueCfopjqJc3cKnyusKHTtq2bP09Inv3BUy/SvYX52DV8xyzewD9wKja6qO7gQoUl24lwCA+gxDQiFZFMlI7mK33tWHZ0KQ9kRQcyazoyWRKlzX06cXkstbRUIAAh+QQJCQB/ACwAAAAAYgALAAAH2oAAgoOEHH9/hIkAh4qEhyYgkZKThyqWl5grh1qcnZ6bnqGHHI2liYaIpoyqf5CTr5WYspp/oaK1tp2jprwAqLyrpY+vsH+ys6C5Wsm5u72lv6zArcSUxseXtMqczLbOz4rRwqnjrtUgsdgq2tvdt6Tg4cGN84rD5+jX6uzK7p9/8OIVqpeIoCNq+NJh49cMVz+AAk8ZHDRR0L1zCo8x9OawYcCIviouIkcPIUZ9C/3p6sjxY0RxJaeZq5YRGctb25ZBfCZhUABBMO2RFDqTWM1MKrnd/OfyAaFAACH5BAkJAH8ALAAAAABiAAsAAAfZgACCg4Qcf3+EiQCHII2Oj4crKpOUlYdamJmabJeanoeKhIccoaWJhoimjI+skZWvKp2emrKzWqCqf6SmvKi8q6yOrrCUtbNlxp+ppaO8vbjMf8GQf5LEk8maadmZ0KHNzqW+udPC1dfYf7a06uu3y9+64eLeisDTw9eyRsfcmPWJwM07BVCUtHIg8hHz96/duoKDBA4cNC4awoTn0DHk5NAWREESJwKoGO+iQlgM37l790ueSIr1LBg0mVFfOyS21jD8uMils10jBZG0d7DcyVcpd8IjCjRUIAAh+QQJCQB/ACwAAAAAYgALAAAH2IAAgoOEHH9/IImKi4cqjo+Qh2lalJWWh5aZWmyHhJ4AnZ+Dhxyipp6GiIurjZCuh2yal3+ys6egf7ekt7epq6x/rq9/sbVamMacuaehpru8pr6/iq3CjsjG2LLKusvOf6XQotLTINXWsMbHtOrNou6fz+Koh+WJ58Lp2ey13Mze78DN+0RuGr5h6tYlhOeJISF5AwUV/HUwErF2/LY5HAUwnsCIgyYCs/ZIXy1tsjYKUokrHEgAIhkFI6kCpSabmVjq/DjQgcR69iqWvLhPnb9v3TZ4qkAoEAAh+QQJCQB/ACwAAAAAYgALAAAH34AggoOEJn9/KomKi4dajo+Qh1mQlFqHAJiZmhyXmp6dnpmHHKGahKcghoiLrI2Vj4dir7B/pZmctbYAoKWjugCohYesrX+zjodwx5a5tri/vKG+usGDqsSMxseHZsvRns+635rTttWC19iJrrOHb97NpeG246J/pNTn6ersVJWHauD9mtcrnrR7v86lGqZOBbtXh64I1EXwIDSE+artw/bw358tE53VwzRyF0Zz+hjy09buD5uQ8krKPFlK4UZiHSkd8rfNILiZF/Gh1KiSI0uILmGGqvjJJzmaAA5oCgQAIfkECQkAfwAsAAAAAGIACwAAB8WAKoKDhCt/f1qJiouHi45ahxwAk5SVh5WYAByXmZScnQCRoJOEpSqGiI+KjaqJoqOfnZt/o6G0sH+So6aFrK2+qq+gsZmztcSYwp28g6itrqm/uce3oMa41LqgzILOz8CPypnIldfD1Z3imNyn4I7ujNPYo+bp6OPy29ze0s+Q+fZq1cOXrRY7FfBWRQsGkCA9cp7uJWu4bl9CaP7UWZJYDuIkj7a0LbO4MFzJdxQ3CgTJMiUlFiQznown0qG1lgUrUagUCAAh+QQJCQB/ACwAAAAAYgALAAAHuoBagoOEbH9/hIlahwCNjo+HHI+TAIyUjhyWl5V/m42RngCKiYejg5qXoJ6olJmdq6+bqpumgoaItayTs6mxl66hupB/kp61WrfHwo68lMuNwLDBxKHHi7imz5zFsr6t2uDUxrXJud674t2h0eqw3JfWpebT787nj+y99NXk8tn3zNLp85TP3r5x5pQB/CTQIMFwB2kpVBhx4KaC6CpSOlbuX8UDjiZwcrTAUQFoqEo2KilM5LZJJx0FAgAh+QQBCQB/ACwAAAAAYgALAAAHqIAggoOEJn9/AImKi4eLjgCHHI+MiJOJHI2WkJWWkZoAhKEghpyTmZ1/kpqnk5ilj6ywqZ+ihbGOt5SqqJ+un7mKnpq1g6S/r7izq8iLvsvHu5PEgsbPy9GyvcCJ25vYjtOj3ePKvJrO5qjfi+HV6abl8NrMwfTc8Y/TIu7y18fz//wNm8Yvm8B3j9D1U0eLIDloAS0pNMhwILGCySBak/jwYCIFihYEAgA7";
		pro.setAttribute('id','kprog');
		pro.style.position='absolute';
		pro.style.top=cs.offsetTop+cs.offsetHeight-40+'px';
		pro.style.left=cs.offsetLeft+cs.offsetWidth-130+'px';
		cs.parentNode.appendChild(pro);
	}
	else{
		document.getElementById('kprog').style.display='block';
	}


	clearTimeout(keffet.tefet);
	cs.getContext('2d').restore();
	
	keffet.ima = new Image();
	keffet.ima.src = keffet.chemin+mago;
	
	keffet.ima.onload = function(){
		
		if(keffet.k_vitesse==0){
			
			keffet.cvs=document.getElementById('cs');
			keffet.contexte=keffet.cvs.getContext('2d');
			keffet.k_vitesse=500/keffet.cvs.width;			//initialisation de la vitesse des effets en fonction de la taille du canvas
		}
		
		document.getElementById('kprog').style.display='none'
		
		var largeur=Math.floor(keffet.cvs.width/5);
		var hauteur=Math.floor(keffet.cvs.height/5);
		alea()

	}
}



function draw1(cranl,cranh){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var cranl=0;
		var cranh=0;
	}
	
	var largeur=Math.floor(keffet.cvs.width/5);
	var hauteur=Math.floor(keffet.cvs.height/5);
	
	if (cranl ==4*largeur) {
		largeur=largeur+(keffet.cvs.width%5);
	}
	
	else{
		hauteur=Math.floor(keffet.cvs.height/5);
	}
	
	ctx.drawImage(keffet.ima, cranl, cranh,largeur,hauteur, cranl, cranh,largeur,hauteur);
	
	cranl+=largeur;
	
	if (cranl >= keffet.cvs.width){
		cranl=0;
		cranh+=hauteur;
	}
	if (cranh >= keffet.cvs.height){
		return false;
	}
	keffet.tefet = setTimeout(draw1,50,cranl,cranh);

}



function draw2(cranl,cranh){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0){
		var cranl=0;
		var cranh=0;
	}
	
	var largeur=Math.floor(keffet.cvs.width/5);
	var hauteur=Math.floor(keffet.cvs.height/5);
	
	ctx.drawImage(keffet.ima, cranl, cranh,largeur,hauteur, cranl, cranh,largeur,hauteur);

	cranh+=hauteur;

	if (cranh >= keffet.cvs.height) {
		cranh=0;
		cranl+=largeur;
	}
	if (cranl > keffet.cvs.width) {
		return false;
	}
	keffet.tefet=setTimeout(draw2,45,cranl,cranh);

}



function draw3(rayon) {

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var rayon=0;
	}
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.beginPath();
	ctx.arc(0, 0, rayon, 0, Math.PI*2, true);
	ctx.clip();
	ctx.drawImage(keffet.ima, -(keffet.cvs.width/2), -(keffet.cvs.height/2));
	ctx.restore();
	rayon+=15/keffet.k_vitesse;

	if (rayon>= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height))/2) {
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	keffet.tefet=setTimeout(draw3,30,rayon);

}



function draw4(dec) {

	var largeur=Math.floor(keffet.cvs.width/5);
	
	if (arguments.length == 0) {
		var dec=5;
	}

	dec+=5/keffet.k_vitesse;

	if (dec > largeur) {
		dec+= largeur/5;
	}

	var ctx=keffet.contexte;
	for (var i=0; i<5; i++){
		ctx.drawImage(keffet.ima, largeur*i,0,dec,keffet.cvs.height , largeur*i,0,dec,keffet.cvs.height);
	}
	
	if (dec >= largeur) {
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	keffet.tefet=setTimeout(draw4,30,dec);
}



function draw5(dec) {

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=1;
	}
	
	ctx.drawImage(keffet.ima,0,0,dec,keffet.cvs.height,0,0,dec,keffet.cvs.height);
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(dec,0);
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
	ctx.shadowOffsetX=5;
	ctx.shadowBlur=20;
	ctx.shadowColor="black";
	ctx.lineTo(dec,keffet.ima.height);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
	
	dec+=10/keffet.k_vitesse;

	if (dec > keffet.cvs.width) {
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	keffet.tefet=setTimeout(draw5,10,dec);
}



function draw6(dec) {

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=1;
	}
	
	ctx.globalAlpha=dec/12;
	ctx.drawImage(keffet.ima,0,0);
	dec+=1/keffet.k_vitesse;;
	if (dec > 10) {
		ctx.globalAlpha=1;
		return false;
	}
	keffet.tefet=setTimeout(draw6,60,dec);
}



function draw7(dec) {

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=10/keffet.k_vitesse;;
	}
	
	for (var i=0; i<5; i++){
		ctx.drawImage(keffet.ima, (keffet.cvs.width/2)-dec,0,dec*2,keffet.cvs.height , (keffet.cvs.width/2)-dec,0,dec*2,keffet.cvs.height);

	}
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(keffet.ima.width/2-dec,0);
	ctx.lineWidth=2;
	ctx.strokeStyle="black";
	ctx.shadowOffsetX=5;
	ctx.shadowBlur=8;
	ctx.shadowColor="black";
	ctx.lineTo(keffet.ima.width/2-dec,keffet.ima.height);
	ctx.closePath();
	ctx.stroke();
	
	
	ctx.beginPath();
	ctx.moveTo(keffet.ima.width/2+dec,0);
	ctx.lineWidth=2;
	ctx.shadowOffsetX=-3;
	ctx.lineTo(keffet.ima.width/2+dec,keffet.ima.height);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
	
	dec+=10/keffet.k_vitesse;

	if (dec > keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	keffet.tefet=setTimeout(draw7,30,dec);
}



function draw8(dec) {

	if (arguments.length == 0) {
		var dec=10/keffet.k_vitesse;;
	}

	rr=keffet.cvs.height/keffet.cvs.width;
	dec+=20/keffet.k_vitesse;;

	if (dec > keffet.cvs.width) {
		dec = keffet.cvs.width+1;
	}
	
	var ctx=keffet.contexte;
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(dec,0);
	ctx.lineTo(0,dec*rr);
	ctx.moveTo(keffet.cvs.width,keffet.cvs.height);
	ctx.lineTo(keffet.cvs.width-dec,keffet.cvs.height);
	ctx.lineTo(keffet.cvs.width,keffet.cvs.height-(dec*rr));
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	if (dec >= keffet.cvs.width){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	keffet.tefet=setTimeout(draw8,30,dec);
}



function draw9(rayon) {

	var largeur=Math.floor(keffet.cvs.width/5);
	var hauteur=Math.floor(keffet.cvs.height/5);
	
	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var rayon=5/keffet.k_vitesse;
	}
	
	for (var h=0; h<5+1; h++){
		
		ctx.save();
		ctx.beginPath();
		
		for (var i=0; i<5+1; i++){
			
			ctx.arc((largeur*i), hauteur*h, rayon, 0, Math.PI*2, true);
		}
		
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(keffet.ima,0,0);
		ctx.restore();
	}
	
	rayon+=3/keffet.k_vitesse;;
	
	if (rayon > hauteur) {
		return false;
	}
	
	keffet.tefet=setTimeout(draw9,30,rayon);
}



function draw10(angle,rayon,vitesse){
	
	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var angle=0;
		var rayon=0;
		var vitesse=15/keffet.k_vitesse;
	}
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate((Math.PI/180)-((Math.PI/180)*(angle/2)));
	ctx.drawImage(keffet.cvs, -(keffet.cvs.width/2), -(keffet.cvs.height/2));
	ctx.restore();
	
	ctx.save();
	ctx.beginPath();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate((Math.PI/180)*angle);
	ctx.arc(0, 0, rayon, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima, -(keffet.cvs.width/2), -(keffet.cvs.height/2));
	ctx.restore();
	
	angle+=1440/((Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height)))/vitesse);
	if (angle >=360) {
		angle=0;
	}
	rayon+=vitesse;

	if (rayon>= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height))/2) {
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	keffet.tefet=setTimeout(draw10,30,angle,rayon,vitesse);
}



function draw11(dec,vitesse){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=0;
		var vitesse=15/keffet.k_vitesse;
	}

	var rr=keffet.cvs.height/keffet.cvs.width;
	dec+=vitesse;

	if (dec > keffet.cvs.width/2) {
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	ctx.rect(0, 0, dec, dec*rr);
	ctx.rect(keffet.cvs.width, 0, -dec, dec*rr);
	ctx.rect(keffet.cvs.width, keffet.cvs.height, -dec, -dec*rr);
	ctx.rect(0, keffet.cvs.height, dec, -dec*rr);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	keffet.tefet=setTimeout(draw11,30,dec,vitesse);
}

function draw12(dec,opa,vitesse){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var opa=0;
		var dec=0;
		var vitesse=15/keffet.k_vitesse;
	}
	
	rr=keffet.cvs.height/keffet.cvs.width;
	dec+=vitesse;
	opa+=3/(keffet.cvs.width/vitesse);

	if (dec > keffet.cvs.width){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rect(-(dec/2), -(dec*rr)/2, dec, (dec*rr));
	ctx.closePath();
	ctx.clip();
	ctx.globalAlpha=opa/10;
	ctx.drawImage(keffet.ima, -(keffet.cvs.width/2), -(keffet.cvs.height/2));
	ctx.restore();
	keffet.tefet=setTimeout(draw12,30,dec,opa,vitesse);
}



function draw13(dec,vitesse){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=0;
		var vitesse=15/keffet.k_vitesse;
	}

	dec+=vitesse;
	
	if (dec > keffet.cvs.height){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.drawImage(keffet.ima,0,keffet.cvs.height-dec);
	ctx.restore();
	keffet.tefet=setTimeout(draw13,30,dec,vitesse);
}



function draw14(dec,haut,opa,vitesse){

	var ctx=keffet.contexte;

	if (arguments.length == 0) {
		var haut = keffet.cvs.height/4;
		var opa=0;
		var dec=0;
		var vitesse=15/keffet.k_vitesse;
	}
	
	dec+=vitesse;
	opa+=3/(keffet.cvs.width/vitesse);
	
	if (dec > keffet.cvs.width){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	ctx.rect(0,0, dec, haut);
	ctx.translate(keffet.cvs.width,0);
	ctx.rect(0,haut,-dec-dec/4,haut);
	ctx.translate(-keffet.cvs.width,haut*2);
	ctx.rect(0,0, dec+dec/2, haut);
	ctx.translate(keffet.cvs.width,haut);
	ctx.rect(0,0,-dec,haut);
	ctx.translate(-keffet.cvs.width,-haut*3);
	ctx.closePath();
	ctx.clip();
	ctx.globalAlpha=opa/10;
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	keffet.tefet=setTimeout(draw14,20,dec,haut,opa,vitesse);
}



function draw15(dec,opa,vitesse){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0){
		var opa=0;
		var dec=0;
		var vitesse=15/keffet.k_vitesse;
	}

	var rr=keffet.cvs.height/keffet.cvs.width;
	dec+=vitesse;
	opa+=15/(keffet.cvs.width/vitesse);

	if (dec > keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	ctx.save();
	ctx.globalAlpha=opa/10;
	ctx.drawImage(keffet.ima, 0,0,keffet.cvs.width/2, keffet.cvs.height/2,-(keffet.cvs.width/2)+dec,-(keffet.cvs.height/2)+(dec*rr),keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.drawImage(keffet.ima, keffet.cvs.width/2, 0,keffet.cvs.width/2, keffet.cvs.height/2, (keffet.cvs.width)-dec,-(keffet.cvs.height/2)+(dec*rr),keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.drawImage(keffet.ima, 0, keffet.cvs.height/2, keffet.cvs.width/2, keffet.cvs.height/2, -(keffet.cvs.width/2)+dec,(keffet.cvs.height)-(dec*rr),keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.drawImage(keffet.ima, keffet.cvs.width/2, keffet.cvs.height/2,keffet.cvs.width/2, keffet.cvs.height/2, (keffet.cvs.width)-dec,(keffet.cvs.height)-(dec*rr),keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.restore();
	
	keffet.tefet=setTimeout(draw15,30,dec,opa,vitesse);
	
}



function draw16(dec){


	if (arguments.length == 0){
		var dec=0;
	}
	
	var ctx=keffet.contexte;

	dec+=15/keffet.k_vitesse;;
	
	if (dec > keffet.cvs.height){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.drawImage(keffet.ima,0,0,keffet.cvs.width,dec);
	ctx.restore();
	keffet.tefet=setTimeout(draw16,30,dec);
}



function draw17(dec,tour,opa,vitesse){

	if (arguments.length == 0){
		var dec=0;
		var tour=0
		var opa=0;
		var vitesse=20/keffet.k_vitesse;
	}
	
	var ctx=keffet.contexte;
	
	var nombre=14;
	var hauteur=keffet.cvs.height/nombre;
	var longueur=keffet.cvs.width/nombre;
	dec+=hauteur;
	
	if (dec > hauteur*nombre*4){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	
	for (var i=0; i<nombre; i++){
		
		if (i == nombre-1){
			longueur2+=(keffet.cvs.width%nombre);
		}
		else{
			longueur2=longueur
		}
		
		ctx.rect(i*longueur,0-(hauteur*i),longueur2,nombre*tour);
		ctx.globalAlpha=opa/10;
	}
	
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	opa+=1/(keffet.cvs.width/vitesse);
	tour++;
	
	keffet.tefet=setTimeout(draw17,20,dec,tour,opa,vitesse);
}



function draw18(dec,opa,vitesse){

	var ctx=keffet.contexte;


	if (arguments.length == 0){
		var dec=0;
		var opa=0;
		var vitesse=10/keffet.k_vitesse;
	}
	
	if (dec > keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	
	ctx.lineTo(0, 0)
	ctx.arc(dec, keffet.cvs.height/4, keffet.cvs.height/4, -Math.PI/2, Math.PI/2, false);
	ctx.arc(dec,keffet.cvs.height/2+keffet.cvs.height/4, keffet.cvs.height/4, -Math.PI/2, Math.PI/2, true);
	ctx.lineTo(0, keffet.cvs.height);
	ctx.lineTo(0, 0)
	
	ctx.closePath();
	ctx.clip();
	ctx.globalAlpha=opa/100;
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	
	ctx.save();
	ctx.beginPath();
	
	ctx.lineTo(keffet.cvs.width, 0)
	ctx.arc(keffet.cvs.width-dec, keffet.cvs.height/4, keffet.cvs.height/4, -Math.PI/2, Math.PI/2, false);
	ctx.arc(keffet.cvs.width-dec,keffet.cvs.height/2+keffet.cvs.height/4, keffet.cvs.height/4, -Math.PI/2, Math.PI/2, true);
	ctx.lineTo(keffet.cvs.width,keffet.cvs.height);
	ctx.lineTo(keffet.cvs.width, keffet.cvs.height);
	
	ctx.closePath();
	ctx.clip();
	ctx.globalAlpha=opa/100;
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	opa+=10/(keffet.cvs.width/vitesse)*4;
	dec+=vitesse;
	
	keffet.tefet=setTimeout(draw18,20,dec,opa,vitesse);
	
}



function draw19(dec,car,ori,vitesse){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=0;
		var car=new Image();
		car.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWAAAADICAMAAADhh8tJAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAAAQEBAgICAwMDBAQEBQUFBgYGBwcHCAgICQkJCgoKCwsLDAwMDQ0NDg4ODw8PEBAQEREREhISExMTFBQUFRUVFhYWFxcXGBgYGRkZGhoaGxsbHBwcHR0dHh4eHx8fICAgISEhIiIiIyMjJCQkJSUlJiYmJycnKCgoKSkpKioqKysrLCwsLS0tLi4uLy8vMDAwMTExMjIyMzMzNDQ0NTU1NjY2Nzc3ODg4OTk5Ojo6Ozs7PDw8PT09Pj4+Pz8/QEBAQUFBQkJCQ0NDRERERUVFRkZGR0dHSEhISUlJSkpKS0tLTExMTU1NTk5OT09PUFBQUVFRUlJSU1NTVFRUVVVVVlZWV1dXWFhYWVlZWlpaW1tbXFxcXV1dXl5eX19fYGBgYWFhYmJiY2NjZGRkZWVlZmZmZ2dnaGhoaWlpampqa2trbGxsbW1tbm5ub29vcHBwcXFxcnJyc3NzdHR0dXV1dnZ2d3d3eHh4eXl5enp6e3t7fHx8fX19fn5+f39/r0kA/wAA92cA/2oAgICAgYGBgoKCg4ODhISEhYWFhoaGh4eHiIiIiYmJioqKi4uLjIyMjY2Njo6Oj4+PkJCQkZGRkpKSk5OTlJSUlZWVlpaWl5eXmJiYmZmZmpqam5ubnJycnZ2dnp6en5+foKCgoaGhoqKio6OjpKSkpaWlpqamp6enqKioqampqqqqq6urrKysra2trq6ur6+vsLCwsbGxsrKys7OztLS0tbW1tra2ubm5u7u7vLy8//u8wMDAwsLCw8PDxcXFx8fHyMjIzMzMzc3Nzs7O0NDQ0dHR0tLS1NTU1tbW2NjY2tra29vb3Nzc3d3d3t7e39/fzv/i4+Pj5OTk5ubm6enp6+vr7Ozs7e3t7u7u8PDw8vLy8/Pz9vb29/f3+Pj4+fn5+vr6+/v7/Pz8/v7+////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATqboAQAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAZXUlEQVR4Xu2diV9UV5aAT9WrgiooZEcQ0AIRFXFBI4tGpRE0rkFUjCxq3BJRFI1ioiLDuBJxwT0aFQ0uuINx6Z6JnXR3unumJz09k5qZzGQmme6ZztR/UXPfUsurest9790LpK3zSwSq7j33nO+dd+pu7xZ4wkKVAFDVHlbuCQOmHARhwGHAlAlQVh+O4DBgygQoqw9HcBgwZQKU1YcjOAyYMgHK6sMRHAZMmQBl9eEIDgOmTICy+nAEhwFTJkBZfTiCw4ApE6CsPhzBYcCUCVBWH47gv0zAz3xyr4KTKSAj09h3z/PFKbOgor7/Ivh5J5KjTk6ivTRNFl6mvLlDRsqnoLcZvnyG0/lmZycVDtSU0ge8Cckaf3hmjR176JJPPm3DE67CvLEjBT01m45TI0JYMR3AT58+rSsvz/djTViMBI+lSqlHixdnsXqnL39KGAUddVQAowxgtVoXCDf9XiJgxUp27EgyQ/rqXjpQSGqlALgW7JU3KEANVnm5OB5M75KEQUMXccAL06CyH+jyTVxDWWj4URpciOkkDbgWmNp+44sa6q5ioJgYDQqKyAK+nQsT+hMv19aHmTCDAhlCKokCPmGNu6PKF7dnJlb0qVK1OufgRUwScClMF1FpOXqKl/Uj/JIISYlMwN8W9Pu0yb4XFk3nq0zKLx2xyF/MCjBM6d6oirBuIxRyhNUQBDwTsji+672UC/l+MDMuQMo/5mVS4IsBv5v8feecoCLwhtLdsSLaShgNGXXkAJd7AcR6Q61wkoukVHkBX9ieuzSUdW8+FPSQgUJSCzHApVDGOd2ZuyBe8L7wIEm+ru7Rgt4YqyXCLjEu7B5pXk2SDRFdpADP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";
		var ori=new Image();
		ori.src=keffet.cvs.toDataURL("image/png");
		var vitesse=20/keffet.k_vitesse;
	}
	
	var car_width=(car.width/500)*keffet.cvs.width
	var car_height=(car.height/500)*keffet.cvs.height
	
	if (dec > keffet.cvs.width+car_width){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	ctx.drawImage(ori,0,0);
	ctx.drawImage(car, -car_width+dec, keffet.cvs.height-car_height,car_width,car_height);
	ctx.drawImage(keffet.ima, -keffet.cvs.width+dec-car_width, 0);
	
	dec+=vitesse;
	
	keffet.tefet=setTimeout(draw19,20,dec,car,ori,vitesse);
}



function draw20(dec,bras,ori,vitesse){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=0;
		var bras=new Image();
		bras.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAFrCAMAAAAQHdwHAAAABGdBTUEAALGPC/xhBQAAAwBQTFRFAAAADAcRBBUEDRQQFQcJFw0TEBYMFxYWHRkhCCUHCjUKFyYWETYOFzkXHiEgHDsiJgQIKwsSIxgaNQMLOAgTORUcJRwhKh0wPBskITAZKCcnLCUwJzcoLTMzMiosNS0zMDkvODY3PTdEDUUND0UQE0kOGEYYG1YaHUMiHW4XIkQeJkgmJ1YmLVUwPEooOkI6MlksN1o3KWYoLHcqKXAwMGcnNmg2MXksNXc2PVNDPWxCTAcXWRAlQiUsSCkzQzg7VCAwUDQ8ZgQdcAwrYSY4SDxCUjxCcDFFQUA/RXAzR0VGTkVTR1RHTFBRVEhLVk1RUlNPWFVWWltiSWlJR3dIVmRWV31XX3JkYkxRY1lccU1XZ11hc1tjZW9XZ2ZmZnNlanFzdGhreGxxcHRseHd3eH+FHIMdM5McKokpL4UyJpMmNIcpN4k5OpY6LKIsN6c2MbYyO4hBP6RBO8c5OfkpPPw7PfxCQIcaQ4Y7R5EkQJg9QLIRTqwpZpI/RodFSJhIU4ZJUodWUppLWZdXXYZjR6ZITKtRSrVJTbtUVahOVqhWVrdIVrdXXLlhYo5dZpRfZIhkZ4hweYN8fpx+ZrRPYqljZbZldKxqfaByeLR3SNMPQto8VM8pT+4PRfsvQvw8Ufc5ZPIQauskRsVJS8dSR9tHS9RRUsxLVsZXWdhYTMhkT9RnXcZiXNRkTOxMTepWQ/tETPVTWepZUvRMVPNVWOpja81GYMxeY9ZJYtZbZcdkbcNxZ9hnech4cd1ud9h3beNDYudbY/FZZOVmYvBjc+BvftSIiwYwoQIzhkxdgW12g3h7h3uCk3uBhIN7gtBahcN1iIeHjJGLjpGSlIiLmoqRkZGPmJaWmJqhjauNg7OHlKCNnaKapIuSppebspmeqZ2hspyjoqWeqKamrq6ytqaqua6xtrCtt7W2xK6zxba6yrzB1LrCyMTEzs7TyNTD18bK3MzR19DM3NPV4s3T6Nba89vd7Nzh9t3k9+Td6+Tk+ePp/Ofw+PX0AAAAAAAACp4vbAAAAQB0Uk5T////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFP3ByUAAAAJcEhZcwAACxAAAAsQAa0jvXUAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjQ+jcx2AAAawUlEQVR4Xu1dDXRbV33/51XOq6yodRUvI6+uUnXMhjosNCGuiw3uiQlbtFRBa2DVUlQcBOMM55QC0kLHbEowHa63dl0aDuxD/QjU2WnCsyQvNBg4wbB2dSgTuAgYNW2NgmPHZwqxHCXPHO1/73uS3nt6H5aebM44vfmwrY/7u//v//3/75UhvwoDVgEj/zpIRVx+nV3VsquLDe73/klF79Z4cYgLTN7o8iieKcokxF2YdfsueIPWUFIwcxH8mVmXfBoJxJt07xOECa8wy1kD4ZLCPDsrZLt2TpVmIiAznG2nkJy4Ipz3Xrwc8FtBSd54UejxC4Lgf3Whiy2QQ0BCUzMBIdWTE1Ib3B6Wde8MVYcT8uC7OY/LN5vL+dJCaCLbJU5EQIJnz+5bSndlz7s2ePyBnqmpPZ6ZKmA4X3pq/917fG5bl5Bxz1/yvSTIQAIzcz4h41pY4F5BQnFcSVYhfu5V8c1CNuATzrlyWc+sICkZocT7yqznUqZuTgj4zs5fJK+b91ZOiStHETLzk660MMkuZdjMpboSu/wTmZ2pS/6AkPWCzZ0mL66cEv9+gjHnZcH2miC4e4QUmykoGKEk5ckkPdkkO31lsslvQ1VGZZ6slBTPlCDkhEnYEmAvXAmx01lPMOuXGELtxBW6wPbMslzQy7FAKZmtWJG3ZBAjt+BysX7vPtad8dWlk0yyxK58CPwu4L7v883MuYMIkRPmdlZKSZco9RQksxM775pwgSsIBeciWjwHXdNoplkh7Z5FCKSkYsl7rlCQha4A0rOYOzfltjHT0kpFkKAnIy4k3UUx0p6KJc/503SGQECcSch6JCsRjRGHjzycWxIyd83i0xN1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";
		var ori=new Image();
		ori.src=keffet.cvs.toDataURL("image/png");
		var vitesse=20/keffet.k_vitesse;
	}
	
	var bras_width=(bras.width/500)*keffet.cvs.width
	var bras_height=(bras.height/500)*keffet.cvs.height
	
	if (dec >= keffet.cvs.height+bras_height){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	ctx.drawImage(ori,0,0);
	ctx.drawImage(bras,keffet.cvs.width/2-bras_width/2,-bras_height+dec,bras_width, bras_height);
	ctx.drawImage(keffet.ima,0, -keffet.cvs.height+dec-bras_height);
	
	dec+=vitesse;
	
	keffet.tefet=setTimeout(draw20,20,dec,bras,ori,vitesse);
}



function draw21(dec,vitesse){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var vitesse=7/keffet.k_vitesse;
		var dec=vitesse;
	}
	
	if (dec > keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	ctx.drawImage(keffet.ima,keffet.cvs.width-dec,0,dec,keffet.cvs.height,keffet.cvs.width-dec,0,dec,keffet.cvs.height);
	
	ctx.drawImage(keffet.ima,0,0,dec,keffet.cvs.height,keffet.cvs.width-dec-dec,0,dec,keffet.cvs.height);
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(keffet.cvs.width-dec,0);
	ctx.lineWidth=3;
	ctx.shadowOffsetX=5;
	ctx.shadowBlur=8;
	ctx.shadowColor="black";
	ctx.lineTo(keffet.cvs.width-dec,keffet.cvs.height);
	ctx.closePath();
	ctx.stroke();
	ctx.beginPath();
	ctx.moveTo(keffet.cvs.width-dec-dec,0);
	ctx.lineWidth=2;
	ctx.shadowOffsetX=-3;
	ctx.lineTo(keffet.cvs.width-dec-dec,keffet.cvs.height);
	ctx.closePath();
	ctx.stroke();
	ctx.restore();
	dec+=vitesse;
	
	keffet.tefet=setTimeout(draw21,20,dec,vitesse);
}



function draw22(dec,rr,opa,vitesse){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var vitesse=5/keffet.k_vitesse;
		var dec=vitesse;
		var rr=keffet.cvs.height/keffet.cvs.width;
		var opa=0;
	}
	
	if (dec > keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.rect(0, 0, dec, keffet.cvs.height);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.rect(0,keffet.cvs.height, keffet.cvs.width, -dec*rr);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.rect(0, 0, keffet.cvs.width, dec*rr);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.rect(keffet.cvs.width,keffet.cvs.height,-dec, -keffet.cvs.height);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	
	ctx.restore();
	dec+=vitesse;
	opa+=10/(keffet.cvs.width/vitesse)*2;
	
	keffet.tefet=setTimeout(draw22,20,dec,rr,opa,vitesse);
}



function draw23(dec,opa,vitesse){
	
	var ctx=keffet.contexte;
	
	if (arguments.length == 0){
		var vitesse=10/keffet.k_vitesse;
		var dec=0;
		var opa=0;
	}
	
	var rayon= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height))/2;
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.arc(-rayon+dec, keffet.cvs.height/2, rayon, -Math.PI/2, Math.PI+Math.PI/2, false);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	ctx.save();
	ctx.globalAlpha=opa/100;
	ctx.beginPath();
	ctx.arc(keffet.cvs.width+rayon-dec, keffet.cvs.height/2, rayon, Math.PI/2, Math.PI*2, false);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	if (dec > keffet.cvs.width+keffet.cvs.width/4){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	opa+=10/(keffet.cvs.width/vitesse);
	dec+=vitesse;
	keffet.tefet=setTimeout(draw23,20,dec,opa,vitesse);
}



function draw24(dec,ori,vitesse){

	if (arguments.length == 0){
		var vitesse=12/keffet.k_vitesse;
		var dec=keffet.cvs.height;
		var ori=new Image();
		ori.src=keffet.cvs.toDataURL("image/png");
	}
	var nombre=15;
	var portion=Math.floor(keffet.cvs.height/nombre);
	var ctx=keffet.contexte;
	
	if (keffet.cvs.height-(portion+40)*nombre-dec >= keffet.cvs.height-portion*nombre){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.drawImage(ori,0,0);
	
	for (var i=1; i<=nombre; i++){
		if (keffet.cvs.height-(portion+40)*i-dec >= keffet.cvs.height-portion*i){
			ctx.drawImage(keffet.ima, 0,keffet.cvs.height-portion*i,keffet.cvs.width, portion, 0,keffet.cvs.height-(portion*i),keffet.cvs.width, portion);	
		}
		else{
			ctx.drawImage(keffet.ima, 0,keffet.cvs.height-portion*i,keffet.cvs.width, portion, 0,keffet.cvs.height-(portion+40)*i-dec,keffet.cvs.width, portion);
		}
	}
	
	dec-=vitesse;
	keffet.tefet=setTimeout(draw24,20,dec,ori,vitesse);
}




function draw25(dec){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=Math.PI/40;
	}
	
	if (dec >= Math.PI/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.translate(0, keffet.cvs.height);
	
	ctx.rotate(-Math.PI/2+dec);
	ctx.drawImage(keffet.ima, 0,-keffet.cvs.height);
	ctx.restore();
	
	dec+=Math.PI/40;
	keffet.tefet=setTimeout(draw25,20,dec);
}



function draw26(dec){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=Math.PI/40;
	}
	
	if (dec >= Math.PI/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.translate(0, keffet.cvs.height);
	
	ctx.rotate(-Math.PI/2+dec);
	ctx.drawImage(keffet.ima, 0,0,keffet.cvs.width/2,keffet.cvs.height, 0,-keffet.cvs.height,keffet.cvs.width/2,keffet.cvs.height);
	ctx.restore();
	
	ctx.save();
	ctx.translate(keffet.cvs.width, keffet.cvs.height);
	
	ctx.rotate(Math.PI/2-dec);
	ctx.drawImage(keffet.ima, keffet.cvs.width/2,0,keffet.cvs.width/2,keffet.cvs.height, -keffet.cvs.width/2,-keffet.cvs.height,keffet.cvs.width/2,keffet.cvs.height);
	ctx.restore();
	
	dec+=Math.PI/40;
	keffet.tefet=setTimeout(draw26,20,dec);
}



function draw27(dec,ori,vitesse){

	if (arguments.length == 0){
		var vitesse=10/keffet.k_vitesse;
		var dec=0;
		var ori=new Image();
		ori.src=keffet.cvs.toDataURL("image/png");
	}
	
	var ctx=keffet.contexte;
	
	if (dec>=keffet.cvs.width/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.drawImage(ori,dec,0,keffet.cvs.width-dec*2,keffet.cvs.height);
	ctx.drawImage(keffet.ima,0,0,keffet.cvs.width/2,keffet.cvs.height,0,0,dec,keffet.cvs.height);
	ctx.drawImage(keffet.ima,keffet.cvs.width/2,0,keffet.cvs.width/2,keffet.cvs.height,keffet.cvs.width-dec,0,dec,keffet.cvs.height);
	
	dec+=vitesse;
	keffet.tefet=setTimeout(draw27,20,dec,ori,vitesse);
}



function draw28(dec,rayon){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=-Math.PI/2;
		var rayon= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height)/2);
	}
	
	if (dec >= Math.PI-Math.PI/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.lineTo(keffet.cvs.width/2, keffet.cvs.height/2-rayon);
	ctx.arc(keffet.cvs.width/2, keffet.cvs.height/2, rayon, -Math.PI/2, dec, false);
	
	ctx.moveTo(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.lineTo(keffet.cvs.width/2, keffet.cvs.height/2-rayon);
	ctx.arc(keffet.cvs.width/2, keffet.cvs.height/2, rayon, -Math.PI/2, -dec-Math.PI, true);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	dec+=Math.PI/40;
	keffet.tefet=setTimeout(draw28,20,dec,rayon);
}




function draw29(dec,rayon){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=0;
		var rayon= 1;
	}
	
	ctx.save();
	ctx.beginPath();
	
	for (var i=-Math.PI/2; i<=Math.PI+Math.PI/2; i+=Math.PI/2){
		
		ctx.moveTo(keffet.cvs.width/2, keffet.cvs.height/2);
		ctx.arc(keffet.cvs.width/2, keffet.cvs.height/2, rayon, i, i+dec, false);
	}
	
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	if (dec > Math.PI/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	dec+=Math.PI/40;
	rayon+=16/keffet.k_vitesse;
	
	keffet.tefet=setTimeout(draw29,40,dec,rayon);
}



function draw30(dec,ori){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=0;
	}
	
	if (dec>=Math.PI/2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save()
	ctx.translate(keffet.cvs.width/2, 0);
	ctx.rotate(-Math.PI-Math.PI/2-dec);
	ctx.drawImage(keffet.ima, 0,0,keffet.cvs.width/2,keffet.cvs.height/2, -keffet.cvs.width/2,0,keffet.cvs.width/2,keffet.cvs.height/2);
	ctx.restore();
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, 0);
	ctx.rotate(Math.PI+Math.PI/2+dec);
	ctx.drawImage(keffet.ima, keffet.cvs.width/2,0,keffet.cvs.width/2,keffet.cvs.height/2, 0,0,keffet.cvs.width/2,keffet.cvs.height/2);
	ctx.restore();
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height);
	ctx.rotate(-Math.PI/2+dec);
	ctx.drawImage(keffet.ima,0,keffet.cvs.height/2,keffet.cvs.width/2,keffet.cvs.height/2,-keffet.cvs.width/2,-keffet.cvs.height/2,keffet.cvs.width/2,keffet.cvs.height/2);
	ctx.restore();
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height);
	ctx.rotate(Math.PI/2-dec);
	ctx.drawImage(keffet.ima, keffet.cvs.width/2,keffet.cvs.height/2,keffet.cvs.width/2,keffet.cvs.height/2, 0,-keffet.cvs.height/2,keffet.cvs.width/2,keffet.cvs.height/2);
	ctx.restore();
	
	dec+=Math.PI/40;
	
	keffet.tefet=setTimeout(draw30,20,dec,ori);
}



function draw31(dec,rayon){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=-Math.PI/2;
		var rayon= 5;
	}
	
	if (rayon >= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height)/2)){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.lineTo(keffet.cvs.width/2, keffet.cvs.height/2-dec);
	ctx.arc(keffet.cvs.width/2, keffet.cvs.height/2, rayon, -Math.PI/2+dec, dec, false);
	
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima,0,0);
	ctx.restore();
	
	dec+=Math.PI/15;
	rayon+=4/keffet.k_vitesse;
	keffet.tefet=setTimeout(draw31,10,dec,rayon);
}


function draw32(dec,rayon){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=0;
		var rayon= Math.sqrt((keffet.cvs.width*keffet.cvs.width)+(keffet.cvs.height*keffet.cvs.height)/2);
	}
	
	ctx.save();
	ctx.beginPath();
	
	for (var i=-Math.PI/2; i<=+Math.PI+Math.PI/2; i+=Math.PI/3){
		
		ctx.moveTo(keffet.cvs.width/2, keffet.cvs.height/2);
		ctx.arc(keffet.cvs.width/2, keffet.cvs.height/2, rayon, i, i+dec, false);
	}
	
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(keffet.ima, 0, 0);
	ctx.restore();
	
	if (dec > Math.PI/3){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	dec+=Math.PI/40;
	keffet.tefet=setTimeout(draw32,60,dec,rayon);
}


function draw33(dec,rayon){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=20/keffet.k_vitesse;
		var rayon= 0;
	}
	
	var vitesse=20/(500/keffet.cvs.width);
	
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate(rayon);
	ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
	ctx.restore();
	
	dec+=vitesse;
	rayon+=(Math.PI*6)/(keffet.cvs.width/vitesse);
	
	if (rayon >= Math.PI*6){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	keffet.tefet=setTimeout(draw33,20,dec,rayon);
}



function draw34(dec,opa,dd){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=keffet.cvs.width*5;
		var opa= 0;
		var dd=0;
	}
	
	var vitesse=40/keffet.k_vitesse;
	
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.globalAlpha=opa/100;
	ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
	ctx.restore();
	
	if (dec <= keffet.cvs.width){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}
	
	dec-=vitesse+dd;
	dd+=1;
	opa+=(1/(keffet.cvs.width*4))*(keffet.cvs.width*4-(dec-keffet.cvs.width));
	keffet.tefet=setTimeout(draw34,20,dec,opa,dd);
}



function draw35(dec,ee,dd,rayon,ori){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=keffet.cvs.width;
		var dd='aller'
		var ee=1
		var rayon= 0;
		var ori=new Image();
		ori.src=document.getElementById('cs').toDataURL("keffet.image/png");
	}
	
	var vitesse=40/keffet.k_vitesse;
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate(rayon);
	ctx.drawImage(ori, -dec/2, -dec*rr/2, dec, dec*rr);
	if (dd=='aller'){
		ctx.globalAlpha=1/(keffet.cvs.width*4)*(dec-keffet.cvs.width);
	}
	ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
	ctx.restore();
	
	if (dd=='aller'){
		dec+=vitesse+ee;
		ee+=2;
		rayon=((Math.PI*2)/(keffet.cvs.width*4))*(dec-keffet.cvs.width);
		
		if (rayon > Math.PI*2){
			dd='retour';
			rayon = Math.PI*2;
			ee=ee/2;
		}
	}
	
	if (dd=='retour'){
		dec-=vitesse+ee;
		ee+=2
		rayon=((Math.PI*2)/(keffet.cvs.width*4))*(dec-keffet.cvs.width);
		
		if (rayon < 0){
			ctx.drawImage(keffet.ima,0,0);
			return false;
		}
	}
	
	keffet.tefet=setTimeout(draw35,20,dec,ee,dd,rayon,ori);
}



function draw36(sens,dec,ori,tt){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=keffet.cvs.width;
		var sens='moins';
		var tt=1;
		var ori=new Image();
		ori.src=document.getElementById('cs').toDataURL("keffet.image/png");
	}
	
	var vitesse=25/keffet.k_vitesse;
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	
	if (sens == 'moins'){
		ctx.drawImage(ori, -dec/2, -dec*rr/2, dec, dec*rr);
		dec-=(vitesse+tt);
		tt+=dec/keffet.cvs.width;
	}
	
	else{
		if (dec > keffet.cvs.width-vitesse+tt){
			ctx.restore();
			ctx.drawImage(keffet.ima,0,0);
			return false;
		}
		ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
		dec+=(vitesse+tt);
		tt-=dec/keffet.cvs.width;
		
	}
	ctx.restore();
	
	if (dec <= 0){
		sens='plus';
		tt=1;
		dec=0;
	}
	
	keffet.tefet=setTimeout(draw36,20,sens,dec,ori,tt);

}



function draw37(sens,dec,rayon,ori){

	var ctx=keffet.contexte;

	if (arguments.length == 0){
		var dec=keffet.cvs.width;
		var rayon= 0;
		var sens='moins'
		var ori=new Image();
		ori.src=document.getElementById('cs').toDataURL("keffet.image/png");
	}
	
	var vitesse=20/keffet.k_vitesse;
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate(rayon);
	
	if (rayon > 0){
		
		ctx.restore();
		ctx.drawImage(keffet.ima,0,0);
		
		return false;
	}
	
	if (sens == 'moins'){
		
		ctx.drawImage(ori, -dec/2, -dec*rr/2, dec, dec*rr);
		rayon-=(Math.PI*6)/(keffet.cvs.width/10);
		dec-=vitesse;
	}
	
	else{
		
		ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
		dec+=vitesse;
		rayon+=(Math.PI*6)/(keffet.cvs.width/10);
	}
	
	ctx.restore();
	
	if (dec <= 0){
		sens='plus'
		dec=0;
	}
	
	keffet.tefet=setTimeout(draw37,20,sens,dec,rayon,ori);
}


function draw38(dec,ee,rayon,ori,opa){

	var ctx=keffet.contexte;
	var vitesse=60/keffet.k_vitesse;

	if (arguments.length == 0){
		var dec=keffet.cvs.width;
		var ee=1;
		var rayon= 0;
		var ori=new Image();
		var opa=0;
		ori.src=document.getElementById('cs').toDataURL("image/png");
	}
	
	var rr=keffet.cvs.height/keffet.cvs.width;
	
	ctx.save();
	ctx.translate(keffet.cvs.width/2, keffet.cvs.height/2);
	ctx.rotate(rayon);
	
	
	if (rayon<Math.PI){
		
		ctx.drawImage(ori, -dec/2, -dec*rr/2, dec, dec*rr);
		ctx.globalAlpha=opa;
		ctx.drawImage(keffet.ima, -dec/2, -dec*rr/2, dec, dec*rr);
	}
	else{
		var doc=Math.abs(keffet.cvs.width*10-dec-keffet.cvs.width);
		
		ctx.drawImage(ori, -doc/2, -doc*rr/2, doc, doc*rr);
		ctx.globalAlpha=opa;
		ctx.drawImage(keffet.ima, -doc/2, -doc*rr/2, doc, doc*rr);
	}
	
	ctx.restore();
	dec+=vitesse+ee;
	ee+=5;
	opa=(1/(keffet.cvs.width*8))*(dec);
	rayon=((Math.PI*2)/(keffet.cvs.width*7))*(dec-ee-keffet.cvs.width);
	
	if (rayon > Math.PI*2){
		ctx.drawImage(keffet.ima,0,0);
		return false;
	}

	keffet.tefet=setTimeout(draw38,20,dec,ee,rayon,ori,opa);
}



function draw39(cranl,cranh,sens){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var cranl=0;
		var cranh=0;
		var sens='gd';
	}
	var w_decoupe=10;
	var h_decoupe=6;
	var largeur=Math.floor(keffet.cvs.width/w_decoupe);
	var hauteur=Math.floor(keffet.cvs.height/h_decoupe);
	
	if (cranh ==(h_decoupe-1)*hauteur) {
		hauteur=hauteur+(keffet.cvs.height%h_decoupe);
	}
	
	if(sens=='gd'){
		
		if (cranl ==(w_decoupe-1)*largeur) {
			largeur=largeur+(keffet.cvs.width%w_decoupe);
		}
		ctx.drawImage(keffet.ima, cranl, cranh,largeur,hauteur, cranl, cranh,largeur,hauteur);
	}
	
	else{
		var large=0;
		
		if (cranl ==(w_decoupe)*largeur) {
			var large=keffet.cvs.width%w_decoupe;
			largeur=0;
			cranl=keffet.cvs.width;
		}
		ctx.drawImage(keffet.ima, keffet.cvs.width-largeur-cranl, cranh,largeur+large,hauteur, keffet.cvs.width-largeur-cranl, cranh,largeur+large,hauteur);
	}
	cranl+=largeur;
	
	if (cranl >= keffet.cvs.width){
		cranh+=hauteur;
		
		if(sens=='gd'){
			sens='dg';
			cranl=0;
		}
		else{
			sens='gd';
			cranl=0;
		}
	}

	if (cranh >= keffet.cvs.height){
		return false;
	}
	keffet.tefet=setTimeout(draw39,20,cranl,cranh,sens);

}



function draw40(dec,ori){

	var ctx=keffet.contexte;
	
	if (arguments.length == 0) {
		var dec=0;
		var ori=new Image();
		ori.src=document.getElementById('cs').toDataURL("image/png");
	}

	dec+=20/keffet.k_vitesse;
	
	if (dec > keffet.cvs.height){
		ctx.drawImage(keffet.ima, 0, 0);
		return false;
	}
	
	ctx.drawImage(keffet.ima, 0, dec-keffet.cvs.height);
	ctx.drawImage(ori,0,dec);
	
	keffet.tefet=setTimeout(draw40,35,dec,ori);
}