import { Navigate, Route, Routes } from 'react-router-dom';
import { useGame } from './store/game';
import StartScreen from './screens/StartScreen';
import NewGame from './screens/NewGame';
import GameLayout from './screens/GameLayout';
import Inbox from './screens/Inbox';
import NewsItemScreen from './screens/NewsItem';
import Squad from './screens/Squad';
import PlayerScreen from './screens/PlayerScreen';
import TacticsScreen from './screens/Tactics';
import Competitions from './screens/Competitions';
import ClubScreen from './screens/ClubScreen';
import Transfers from './screens/Transfers';
import MatchScreen from './screens/Match';
import More from './screens/More';
import Editor from './screens/Editor';
import Sacked from './screens/Sacked';
import Toast from './ui/Toast';

export default function App() {
  const hasWorld = useGame((s) => s.world != null);
  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/new" element={<NewGame />} />
        <Route path="/editor/*" element={<Editor />} />
        <Route path="/game" element={hasWorld ? <GameLayout /> : <Navigate to="/" replace />}>
          <Route index element={<Navigate to="inbox" replace />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="news/:id" element={<NewsItemScreen />} />
          <Route path="squad" element={<Squad />} />
          <Route path="player/:id" element={<PlayerScreen />} />
          <Route path="tactics" element={<TacticsScreen />} />
          <Route path="comps" element={<Competitions />} />
          <Route path="club/:id" element={<ClubScreen />} />
          <Route path="transfers" element={<Transfers />} />
          <Route path="more/*" element={<More />} />
          <Route path="sacked" element={<Sacked />} />
        </Route>
        <Route path="/match" element={hasWorld ? <MatchScreen /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </>
  );
}
