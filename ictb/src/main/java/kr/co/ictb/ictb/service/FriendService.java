package kr.co.ictb.ictb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ictb.ictb.dao.FriendRequestDao;
import kr.co.ictb.ictb.vo.FriendRequestVO;
import kr.co.ictb.ictb.vo.MemberVO;

@Service
public class FriendService {
	@Autowired
	private FriendRequestDao friendRequestDao;
	
	public List<MemberVO> getAllExcept(String mymid){
		return friendRequestDao.selectAllExceptMe(mymid);
	}
	public void sendRequest(String from , String to) {
		friendRequestDao.sendRequset(from, to);
	}
	public List<FriendRequestVO> getPendingRequests(String mid){
		return friendRequestDao.getPending(mid);
	}
	public void respond(Long mid , String action) {
		friendRequestDao.updateStatus(mid, action.equals("accept") ? "accepted": "rejected");
	}
	public List<MemberVO> getFriends(String mid){
		return friendRequestDao.getFriends(mid);
	}
	public List<FriendRequestVO> getSendRequests(String mid){
		return friendRequestDao.getSendRequests(mid);
	}
}
