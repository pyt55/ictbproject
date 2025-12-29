package kr.co.ictb.ictb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.ictb.ictb.dao.MemberDAO;
import kr.co.ictb.ictb.vo.MemberVO;

@Service
public class MemberService {
	@Autowired
	private MemberDAO memberDAO;
	
	public void create(MemberVO vo) {
		memberDAO.insertMember(vo);
	}
	public int checkEmail(String email) {
		return memberDAO.countByEmail(email);
	}
	public int checkId(String id) {
		return memberDAO.checkId(id);
		
	}
}
