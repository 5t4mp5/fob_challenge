<?php
header("Access-Control-Allow-Origin: *");
require_once 'dbconfig.php';

try {
  $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
  $stateSql = 'SELECT * FROM state;';
  $stateq = $pdo->query($stateSql);
  $stateq->setFetchMode(PDO::FETCH_ASSOC);
  $stateArr = array();
  $index = 0;
  while($r = $stateq->fetch()){
    $stateArr[$index] = $r;
    $index++;
  }
  $countrySql = 'SELECT * FROM country;';
  $countryq = $pdo->query($countrySql);
  $countryq->setFetchMode(PDO::FETCH_ASSOC);
  $countryArr = array();
  $index = 0;
  while($r = $countryq->fetch()){
    $countryArr[$index] = $r;
    $index++;
  }
  $productSql = 'SELECT * FROM products;';
  $productq = $pdo->query($productSql);
  $productq->setFetchMode(PDO::FETCH_ASSOC);
  $productArr = array();
  $index = 0;
  while($r = $productq->fetch()){
    $productArr[$index] = $r;
    $index++;
  }
  $resultArr = array();
  $resultArr['states'] = $stateArr;
  $resultArr['countries'] = $countryArr;
  $resultArr['products'] = $productArr;
  echo json_encode($resultArr);
} catch(PDOException $e) {
  die("Could not connect to database $dbname :" . $e->getMessage());
}
