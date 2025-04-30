import { Marker, NaverMap, NavermapsProvider, useNavermaps, Container as MapDiv } from "react-naver-maps";

const CardItem_Map = (props) => {
  const {mapx, mapy, mapOpen} = props;
  //npm install react-naver-maps
  //https://colinch4.github.io/2021-06-07/navermap/
  //https://zeakd.github.io/react-naver-maps/api-references/naver-map/
    const navermaps = useNavermaps();
    
    return (        
        <MapDiv style={{width: "100%", height: mapOpen? "300px":"0px"}}>
          <NaverMap defaultCenter={new navermaps.LatLng(mapy,mapx)} defaultZoom={15} defaultSize={new navermaps.Size(340,300)}>
          <Marker defaultPosition={new navermaps.LatLng(mapy,mapx)}></Marker>
          </NaverMap>
        </MapDiv>        
    );
}


export default CardItem_Map;