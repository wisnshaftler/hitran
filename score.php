<?php
require_once("dbconnection.php");

if(isset($_GET['leaderboard'])){
  $sql = "SELECT * FROM  ORDER BY score DESC limit 50";
  $result = $conn->query($sql);
  
  if($result->num_rows>0){
    while($row = $result->fetch_array()){
      $data[]  = array('name'=>$row['name'], 'score'=>$row['score'], 'date'=>$row['time']);
    }
    echo(json_encode($data));
    
  }
}

if(isset($_GET['score'])){
  $quots = ['කාටත් නෑ පදිරී.... ඒකයි අපි තාමත් ඉදිරී....', 'නමස්තේ නමස්කාරම්.... ', 'වටවෙලා හිටියට ඔය කවුරුත් නැහැ දුකේ... හඳේ හාවා උනත් ඉන්නෑ අමාවක රැයේ....',
           'දාගන්නේ සුපිරි නඩු.. එකට ඉන්නෙ සුපිරි බඩු..', 'ශුවර් නම් මිසක් ඇඟටනම් ගන්නෙ නෑ.... ඉස්සර හිටපු එකා නෙමෙයි උබලා මාව දන්නේ නෑ....',
           'ජන්මෙන් නෙමෙයි මේ පුරුද්ද එන්නෙ ආරෙන්... හොයනවා සල්ලි මත්ද්‍රව්‍ය මාර්ගෙන්...', 'ඇඟෙන් මනින්න බෑ ඩෝ කැ$කම.... මට වගෙ නෙමෙයි උබට තියෙන්නෙ බැරිකම....', 'මාරුකලේ නෑ පැත්ත... ගත්තේ හරි පැත්ත...', 'ගන්නෑ මං කේන්ති ගහලා ඉද්දි සූස්ති', 'අහසෙ දෙවියෝ නෑ දෙවියො ඉන්නෙ හිතේ... මගෙ වටේ හිටිය උන් බිලි උනා මධුවිතේ...', 'මීටරේ හිටියේ හැමදාම. මීටරේ හොඳට වැඩ තාම.', 'විසිකරලා කුඩු ගංජා අරක්කු... ඇත්ත ලඟ දණ ගැහුවා නොවී මං පරක්කූ...','නිහඬව හිටියට පසුබහින්නෙ නෑ... බල්ලන් බිරුවට අපි බුරන්නෙ නෑ....', 'කවුරුත් දවසක අඩි හයක් පොලව යට'];
  $quote = array_rand($quots,1);
  $quote = $quots[$quote];
  $name =$_GET['name'];
  $score = $_GET['score'];
  
  $sql = "INSERT INTO  (name, score) VALUES ('$name', '$score')";
  $conn->query($sql);
  
$url = "";

$curl = curl_init($url);
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

$headers = array(
   "Accept: application/json",
   "Content-Type: application/json",
);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

$data = 
  '{
  "username": "manigar.tk/hitran",
  "avatar_url": "https://manigar.tk/hitran/simpran.jpg",
  "content": "",
  "embeds": [
    {
      "title": "manigar.tk",
      "color": 231361,
      "description": "\n ප්ලේයර් **'.$name.'** මහතා සිම්ප්රාන් සර් ට __'.$score.'__ වතාවක් හොම්බටම ගැසුවේය! \n \n > ජාති තද කොර නිග ගැම්ම පට්ට පදිරි Boi, GG wuththo..!!!!!!!",
      "timestamp": "",
      "url": "https://manigar.tk",
      "author": {
        "name": "'.$quote.'"
      },
      "image": {},
      "thumbnail": {
        "url": "https://github.com/wisnshaftler/saving-public-manigar/blob/main/proManitha.png?raw=true"
      },
      "footer": {
      "text": "\n ගහපං... තව ගහපං... ඕකම ඔබ ඔබ හිටපං <- මෑණියෝ ❤️ \n thanks for playing HitRan"
      },
      "fields": []
    }
  ],
  "components": []
}';

curl_setopt($curl, CURLOPT_POSTFIELDS, $data);

//for debug only!
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);

$resp = curl_exec($curl);
curl_close($curl);
var_dump($resp);

}
?>