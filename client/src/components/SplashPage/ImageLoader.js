// this is a bit dorky, but it works
import { ReactComponent as LiveChatImg } from './images/undraw_chatting_re_j55r.svg'
import { ReactComponent as WorkSpacesImg } from './images/undraw_duplicate_re_d39g.svg'
import { ReactComponent as ChannelsImg } from './images/undraw_group_chat_re_frmo.svg'
import { ReactComponent as DMImg } from './images/undraw_team_chat_re_vbq1.svg'
import { ReactComponent as HistoryImage } from './images/undraw_file_searching_re_3evy.svg'
import { ReactComponent as FreeImage } from './images/undraw_crypto_portfolio_2jy5.svg'

export default function Image ({ id, className }) {
  switch (id) {
    case 1: return <LiveChatImg className={className} />
    case 2: return <WorkSpacesImg className={className} />
    case 3: return <ChannelsImg className={className} />
    case 4: return <DMImg className={className} />
    case 5: return <HistoryImage className={className} />
    case 6: return <FreeImage className={className} />
    default: return <LiveChatImg className={className} />
  }
}
