package kr.co.ictb.ictb.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.co.ictb.ictb.vo.MemberVO;
@Mapper
public interface MemberDAO {
	void insertMember(MemberVO vo);
	
	int countByEmail(String email);
	
	int checkId(String id);
}
