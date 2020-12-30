-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: justscript
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES UTF8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descript` varchar(100) NOT NULL,
  `script` mediumtext NOT NULL,
  `type` varchar(45) NOT NULL,
  `user_id` int NOT NULL,
  `score` int NOT NULL DEFAULT '0',
  `openAble` tinyint NOT NULL DEFAULT '1',
  `width` varchar(45) NOT NULL DEFAULT '50%',
  `height` varchar(45) NOT NULL DEFAULT '50%',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (8,'Login','\n<style>\n@import \"bourbon\";\n body {\n	 background-color: #4CAF50;\n	 font-family: \"Asap\", sans-serif;\n}\n .login {\n	 overflow: hidden;\n	 background-color: white;\n	 padding: 40px 30px 30px 30px;\n	 border-radius: 10px;\n	 position: absolute;\n	 top: 50%;\n	 left: 50%;\n	 width: 400px;\n     transform : translate(-50%, -50%);\n}\n .login::before, .login::after {\n	 position: absolute;\n	 width: 600px;\n	 height: 600px;\n	 border-top-left-radius: 40%;\n	 border-top-right-radius: 45%;\n	 border-bottom-left-radius: 35%;\n	 border-bottom-right-radius: 40%;\n	 z-index: -1;\n}\n .login::before {\n	 left: 40%;\n	 bottom: -130%;\n	 background-color: rgba(69, 105, 144, 0.15);\n}\n .login::after {\n	 left: 35%;\n	 bottom: -125%;\n	 background-color: rgba(2, 128, 144, 0.2);\n}\n .login > input {\n	 font-family: \"Asap\", sans-serif;\n	 display: block;\n	 border-radius: 5px;\n	 font-size: 16px;\n	 background: white;\n	 width: 100%;\n	 border: 0;\n	 padding: 10px 10px;\n	 margin: 15px -10px;\n}\n .login > button {\n	 font-family: \"Asap\", sans-serif;\n	 cursor: pointer;\n	 color: #fff;\n	 font-size: 16px;\n	 text-transform: uppercase;\n	 width: 80px;\n	 border: 0;\n	 padding: 10px 0;\n	 margin-top: 10px;\n	 margin-left: -5px;\n	 border-radius: 5px;\n	 background-color: #4CAF50;\n}\n .login > button:hover {\n	 background-color: #317133;\n}\n a {\n	 text-decoration: none;\n	 color: rgba(255, 255, 255, 0.6);\n	 position: absolute;\n	 right: 10px;\n	 bottom: 10px;\n	 font-size: 12px;\n}\n \n</style>\n<div class=\"login\">\n  <input type=\"text\" placeholder=\"Username\">\n  <input type=\"password\" placeholder=\"Password\">\n  <button onclick=\"login()\">Login</button>\n</div>\n\n<script>\nfunction login(){\n    let id = document.querySelector(\".login input[type=text]\").value\n    let pw = document.querySelector(\".login input[type=password]\").value\n    if(!(id && pw)){\n        alert(\"Empty login form\")\n        return;\n    }\n    fetch(`http://localhost:3001/api/login`, {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\",\n            },\n        body: JSON.stringify({\n            id: id,\n            pw: pw\n        })\n    }).then(x => x.json())\n    .then(xx => {\n        let x = xx.data\n        if(x.session){\n            console.log(x.session)\n            sessionStorage.setItem(\"login\", x.session);\n            alert(\"login Successed!\")\n            window.top.location.reload();\n        }else{\n            alert(\"Not currect password!\")\n        }\n    })\n}\n</script>\n ','html',1,5,1,'50%','50%'),(9,'Register','<script>\n    function checkoverlap(){\n        let id = document.querySelector(\"#username\").value\n        if(!(id)){\n            alert(\"Empty login form\")\n            return;\n        }\n        fetch(`http://${parent.window.location.hostname}:3001/api/login/overlap`, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                },\n            body: JSON.stringify({\n                id: id\n            })\n        }).then(x => x.json())\n        .then(x => {\n            if(x.code == 200){\n                alert(\"사용가능한 아이디입니다.\")\n            } else {\n                alert(\"아이디가 중복되었습니다!\")\n                document.querySelector(\"#username\").focus()\n            }\n        })\n    }\n    function register(){\n        let id = document.querySelector(\"#username\").value\n        let password = document.querySelector(\"#password\").value\n        let pwcheck = document.querySelector(\"#pw_check\").value\n        let nick = document.querySelector(\"#nickname\").value\n        if(!(id && password && pwcheck && nick)){\n            alert(\"빈값을 둘수 없습니다.\")\n            return;\n        }\n        if(password != pwcheck){\n            alert(\"비밀번호 확인이 일치하지 않습니다.\")\n            document.querySelector(\"#pw_check\").focus()\n            return;\n        }\n        fetch(`http://${parent.window.location.hostname}:3001/api/login/register`, {\n            method: \"POST\",\n            headers: {\n                \"Content-Type\": \"application/json\",\n                },\n            body: JSON.stringify({\n                id: id,\n                pw: password,\n                pwc: pwcheck,\n                nickname: nick\n            })\n        }).then(x => x.json())\n        .then(x => {\n            if(x.code == 200){\n                alert(\"가입이 완료되었습니다.\")\n            } else {\n                alert(\"가입에 실패하였습니다!\")\n            }\n        })\n    }\n\n    function noWhiteSpace(e){\n        console.log(e)\n        return e.which !== 32;\n    }\n</script>\n<div class=\"login\">\n    <input id=\"username\" type=\"text\" placeholder=\"Username\" onkeypress=\"return event.charCode != 32\">\n    <button onclick=\"checkoverlap()\">중복체크</button>\n    <input id=\"password\" type=\"password\" placeholder=\"Password\">\n    <input id=\"pw_check\" type=\"password\" placeholder=\"Password Check\">\n    <input id=\"nickname\" type=\"text\" placeholder=\"Nickname\">\n    <button onclick=\"register()\">register</button>\n</div>\n<script>\n    document.getElementsByTagName(\"input\").forEach(element => {\n        console.log(element)\n        element.onkeypress = (event) => event.charCode != 32;\n    });\n</script>','html',1,5,1,'50%','50%'),(10,'sfsdfsdfs','nothing','html',1,0,1,'50%','50%'),(11,'Canvs','\n                    this.ctx.fillStyle = \"rgb(200, 0, 0)\";\n                    this.ctx.fillRect(10, 10, 50, 50);\n                    this.ctx.fillStyle = \"rgb(0, 0, 200, 0.5)\";\n                    this.ctx.fillRect(30, 30, 50, 50);','canvas',1,0,1,'50%','50%'),(16,'ssss','<h1>sdfsdfsdfs</h1>','html',8,0,1,'500px','400px'),(17,'HELLO','<h1>HELLO</h1>','html',1,0,1,'800px','400px'),(18,'SSSSS','<h1>SSS</h1>','html',1,0,1,'500px','400px');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `report_count` int DEFAULT '0',
  `write_count` int DEFAULT '0',
  `recomment_count` int DEFAULT '0',
  `nickname` varchar(45) NOT NULL,
  `profile_img` varchar(45) NOT NULL DEFAULT 'Icon.png',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','1234',0,0,0,'MASTER','img/upload_file-1608862044329.png'),(2,'ABCD','WWWWWW',0,0,0,'TESTING','Icon.png'),(3,'test','WWWWWW',0,0,0,'TESTING','Icon.png'),(8,'ssss','ssss',0,0,0,'ssss','Icon.png');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-30 20:16:02
