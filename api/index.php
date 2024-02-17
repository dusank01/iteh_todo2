<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb=new DbConnect;
$conn=$objDb->connect();
$method=$_SERVER['REQUEST_METHOD'];
switch($method){
    case "GET":
        $sql="SELECT * FROM `tasks`";
        $path=explode('/', $_SERVER['REQUEST_URI']);
        if(isset($path[3]) && is_numeric($path[3])){
            $sql.= "WHERE id=:id";
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":id",$path[3]);
            $stmt->execute();
            $tasks=$stmt->fetch(PDO::FETCH_ASSOC);
        }
        else{
        $stmt=$conn->prepare($sql);
        $stmt->execute();   
        $tasks=$stmt->fetchAll(PDO::FETCH_ASSOC);
    }

        echo json_encode($tasks);
        break;
    case "POST":
        $task=json_decode(file_get_contents('php://input'));
        $sql="INSERT INTO tasks(id,korisnik, naziv, opis,rok) VALUES(null,:korisnik,:naziv,:opis,:rok)";
        $stmt=$conn->prepare($sql);
        $stmt->bindParam(":korisnik",$task->korisnik);
        $stmt->bindParam(":naziv",$task->naziv);
        $stmt->bindParam(":opis",$task->opis);
        $stmt->bindParam(":rok",$task->rok);
        if($stmt->execute()){
            $response=['status'=>1,'message'=>'Success'];

        }else{
            $response=['status'=>0,'message'=>'Failed'];}
            echo json_encode($response);
            break;
        case "PUT":
                $task=json_decode(file_get_contents('php://input'));
                $sql="UPDATE tasks SET korisnik=:korisnik,naziv=:naziv,opis=:opis,rok=:rok WHERE id=:id";
                $stmt=$conn->prepare($sql);
                $stmt->bindParam(":id",$task->id);
                $stmt->bindParam(":korisnik",$task->korisnik);
                $stmt->bindParam(":naziv",$task->naziv);
                $stmt->bindParam(":opis",$task->opis);
                $stmt->bindParam(":rok",$task->rok);
                if($stmt->execute()){
                    $response=['status'=>1,'message'=>'Success'];
        
                }else{
                    $response=['status'=>0,'message'=>'Failed'];}
                    echo json_encode($response);
                    break;

            case "DELETE":
            $sql="DELETE FROM `tasks` WHERE id=:id";
            $path=explode('/', $_SERVER['REQUEST_URI']);
            $stmt=$conn->prepare($sql);
            $stmt->bindParam(":id",$path[3]);        
        if($stmt->execute()){
            $response=['status'=>1,'message'=>'Success'];

        }else{
            $response=['status'=>0,'message'=>'Failed'];
            }
            echo json_encode($response);
            break;

        

        }
?>
