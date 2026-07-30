<a href="https://github.com/Zechub/zechub/edit/main/site/ZFAV_Club/Guides_for_Creators/Serve_Github_Repo_with_IPFS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Ṣiṣẹ Repo GitHub pẹlu IPFS

## Ìfilọ́lẹ̀

Ninu itọnisọna yii a kọ bi a ṣe le ṣẹda git cloneable URL fun ibi ipamọ GitHub rẹ ti o ṣiṣẹ nipa lilo IPFS CID. 

Eyi wulo lati rii daju wiwa akoonu laibikita agbegbe agbegbe, resistance ifunni ati bi afẹyinti ti o tẹsiwaju ti alaye ti o niyelori!

Àkíyèsí: Àwọn ìwífún tí a gbé sí IPFS wà fún gbogbo àwọn oníṣe nẹtiwọọki. O lè fẹ́ láti ṣe àdàkọ àwọn ìsọfúnni ti ara ẹni/ìmọ̀ràn ní àdúgbò.

## Fi IPFS Kubo sori ẹrọ

Tẹ̀lé àwọn ìtọ́ni tí wọ́n fún ọ nípa bí o ṣe lè fi sori ẹrọ.](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions)

Ninu apẹẹrẹ yii a lo Linux, awọn ẹya OS miiran wa.

Ṣayẹwo wípé ìmúlẹ̀sílẹ̀ ti kẹ́sẹ járí nípa lílo ipfs version

## Àpamọ́ Ẹ̀dà

Lati bẹrẹ, yan ibi ipamọ Git ti o fẹ lati gbalejo & ṣe ẹda rẹ:

Run Command: “git clone https://github.com/zechub/zechub”

![https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png](https://i.ibb.co/HxFX37b/Screenshot-from-2023-05-20-14-14-46.png)

Wàyí o, kí á ṣe é ní ìmúrasílẹ̀ láti ṣe àdàkọ rẹ̀ nípasẹ̀ IPFS.

cd zechub git update-server-info

Tú àwọn ohun Gits:

![](https://i.ibb.co/25RwyWz/image-2024-04-20-175848513.png)

Ṣiṣe eyi yoo gba IPFS laaye lati yọ awọn ohun ti o ba ṣe imudojuiwọn ibi ipamọ Git nigbamii.

## Fi kún IPFS

Once you have done that, that repository is ready to be served. All that is left to do is to add it to IPFS:

$ pwd

/kódì/myrepo

$ ipfs àfikún -r 

![https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png](https://i.ibb.co/LJgK1q3/Screenshot-from-2023-05-20-14-22-38.png)

Awọn esi CID: Qmbgqox5g3614gjTb43s5mdSmmk95aGWWA9EHksL2T91A2

![https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png](https://i.ibb.co/GvhCLwn/Screenshot-from-2023-05-20-14-26-34.png)

Ó dára gan-an! Wàyí o, ìpamọ́ rẹ ti wà lórí ìkànnì náà.

## Ṣe àdàkọ nípa lílo IPFS

O yẹ ki o ni anfani lati gba ibi ipamọ GitHub nipa lilo:

ẹ̀dà git http://ipfs.io/ipfs/yourCID

Tabi o le wa & gba nipa lilo rẹ agbegbe IPFS node.

Àkíyèsí ìkẹyìn: Àpamọ́ repo lórí IPFS kì í gba àtúnṣe lẹ́gbẹ̀ẹ́ ibi ìpamọ̀ github gangan. A gbà á níyànjú láti tún àpamọ̣ náà gbé sókè ní àsìkò déédéé.
