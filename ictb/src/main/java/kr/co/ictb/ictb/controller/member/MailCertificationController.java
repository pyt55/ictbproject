package kr.co.ictb.ictb.controller.member;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.ictb.ictb.dao.CertificationNumberRedisDao;
import kr.co.ictb.ictb.service.EmailSenderService;
import kr.co.ictb.ictb.vo.EmailCheckVO;
import kr.co.ictb.ictb.vo.EmailCountCheckVO;

@RestController
@RequestMapping("/api/auth")
public class MailCertificationController {
	@Autowired
	private EmailSenderService emailSenderService;
	@Autowired
	private CertificationNumberRedisDao certificationNumberRedisDao;
	
	
	@PostMapping("/emailCheck")
	public int sendEmail(@RequestBody EmailCheckVO email) {
		System.out.println("이메일요청됨:"+email.getEmail());
		int checkEmail = emailSenderService.duplicateEmail(email.getEmail());
		if(checkEmail == 0) {
			emailSenderService.sendEmail(email.getEmail());
			return 0;
		}else {
			return 1;
		}
	}
	@PostMapping("/emailCheck/certification")
	public ResponseEntity<EmailCountCheckVO> verifyCertificationNumber(@RequestBody EmailCheckVO dto){
		boolean haskey = certificationNumberRedisDao.hasKey(dto.getEmail());
		int attempts = certificationNumberRedisDao.getAttempt(dto.getEmail());
		if(!haskey) {
			return ResponseEntity.ok(new EmailCountCheckVO(false,"expired"));
			
		}else if (attempts >= 3) {
			return ResponseEntity.ok(new EmailCountCheckVO(false,"exceeded"));
		}else if (certificationNumberRedisDao.getCertifiRedisNumber(dto.getEmail()).equals(dto.getCode())) {
			certificationNumberRedisDao.deleteCertifiRedisNumber(dto.getEmail());
			return ResponseEntity.ok(new EmailCountCheckVO(true,"of"));
		}else {
			certificationNumberRedisDao.increaseAttempt(dto.getEmail());
			return ResponseEntity.ok(new EmailCountCheckVO(false,"wrong"));
		}
	}
}









