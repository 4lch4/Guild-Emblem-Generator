<#
  .SYNOPSIS
    Retrieves all of the media used by the Guild-Emblem-Generator.
  
  .DESCRIPTION
    Downloads all of the borders and emblems available from the Battle.net API.
  
  .PARAMETER AccessToken
    The access token needed to authenticate requests.
  
  .PARAMETER OutDir
    Where you would like to store the images.
  
  .NOTES
    ===========================================================================
    Created on:   	8/16/2020 17:59
    Created by:   	4lch4
    Filename:     	Get-MediaCollection.ps1
    ===========================================================================
#>
param
(
  [Parameter(Mandatory = $true,
             Position = 0)]
  [System.String]
  $AccessToken,
  
  [Parameter(Position = 1)]
  [System.String]
  $OutDir = '.'
)

if ($(Test-Path $OutDir) -eq $false) {
  New-Item -Path $OutDir -ItemType Directory
}

$BaseURL = 'https://us.api.blizzard.com'
$ComponentIndexURL = '/data/wow/guild-crest/index'
$FinalComponentURL = "$BaseURL$ComponentIndexURL`?namespace=static-us&locale=en_US&access_token=$AccessToken"

$Components = Invoke-RestMethod -Uri $FinalComponentURL

Write-Output "$($Components.emblems.Count + $Components.borders.Count) Components retrieved..."

function DownloadImage ($ObjectIn) {
  $NewURL = "$($ObjectIn.media.key.href)&access_token=$AccessToken"
  $BorderRes = Invoke-RestMethod $NewURL
  $ImageUrl = $BorderRes.assets.value
  $Filename = Split-Path -Path $ImageUrl -Leaf
  Invoke-WebRequest -Uri $ImageUrl -OutFile "$OutDir\$Filename"
  
  Write-Output "Saved $Filename..."
}

foreach ($Emblem in $Components.emblems) {
  DownloadImage -ObjectIn $Emblem
}

foreach ($Border in $Components.borders) {
  DownloadImage -ObjectIn $Border
}





