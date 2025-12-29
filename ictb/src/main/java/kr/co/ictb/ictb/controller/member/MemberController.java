package kr.co.ictb.ictb.controller.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ictb.ictb.service.MemberService;
import kr.co.ictb.ictb.vo.MemberVO;

@RestController //빈으로 등록
@RequestMapping("/member")
public class MemberController {
	@Autowired
	private MemberService memberService;
	
	@PostMapping("/signup")
	public ResponseEntity<?> memberjoin(MemberVO membervo){
		memberService.create(membervo);
		return ResponseEntity.ok().build();
	}
	@GetMapping("/idCheck")
	public int idCheck(@RequestParam("id") String id) {
		System.out.println("id:"+id);
		return memberService.checkId(id);
		
	}
}
