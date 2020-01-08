$(function(){
	var mswidth;
	var msheight;
	var wrapwidth;
	var dragindex;
	if($('body').find('.slide-wrap'))
		{
		$('.slide-wrap').append('<div id="slide-container" class="slide-container"></div><ul id="indicator" class="indicator"></ul><div id="prev-btn" class="con-btn"></div><div id="next-btn" class="con-btn"></div>');
		var slideNum=0;
		var jsonLocation = './data/data.json';
		$.getJSON(jsonLocation, function(data){
			$.each(data, function(I, item){
				slideNum++;
				$('.slide-container').append('<div class="slide" id="slide'+slideNum+'" data-index="'+slideNum+'"><img src='+item.img_url+' alt="event'+slideNum+'"></div>');
				$('.indicator').append('<li id="bulet'+slideNum+'" class="bulet" data-index="'+slideNum+'">●</li>');
				mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
				for (var i=0;i<mswidth;i++)/*.slide의 배열이 늘어나면 알아서 아이디와 레프트값 연산 및 .indicator의 btn도 배열 갯수만큼 append*/
				{
					var t=i+1;
					i=i*100;
					$('#slide'+t).css({'left':i+'%'})
					i=i/100;
				};
			});

			mswidth = $('.slide').each(Array).length;/*슬라이드 전체 배열의 갯수만큼의 숫자를 추출*/
			s_width = $('.slide').width();
			var move=0;
			var bi=0;
			var bc;
			var text;
			var pre;
			var next;
			var autospeed=2000;
			var barspeed = autospeed-200;

			$(window).resize(function(){
				var msheight = $('.slide img').height();
				var mswidth = $('.slide').each(Array).length;/*-슬라이드 전체 배열의 갯수만큼의 숫자를 추출-*/
				wrapwidth = mswidth*100;
				s_width = $('.slide').width();

				$('.slide-wrap').css({'height':msheight});
			});

			function nextBtn(){
				move=move-100;
				bi=1+move/100*-1;
				text = Math.floor((move/100)*-1);
				next = text*-100;
				$('#prev-btn').css({'z-index':'-1'});
				$('#next-btn').css({'z-index':'2'});
				if (next+100>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
				{
					bc=text+1;
					// console.log('next  = '+next+' / move = '+move+' / text = '+text);
					$('.slide-container').stop().animate({'left':next+'%'},100);
					$('.bulet').css({'color':'#ccc'})
					$('#bulet'+bc).css({'color':'#999'})
					// console.log('bc = '+bc);
					if ((move-100==mswidth*-100)||(move-100<mswidth*-100))
					{
						move=100;
						//next=(mswidth-1)*-100;
						$('#prev-btn').css({'z-index':'2'});
						$('#next-btn').css({'z-index':'-1'});
						// console.log('11111111111111111111')
					}else if(move>100){
						// console.log('here = '+move);
						move=0;
						next=0;
						$('.slide-container').stop().animate({'left':next+'%'},100);
						$('#prev-btn').css({'z-index':'-1'})
						$('#next-btn').css({'z-index':'2'})
						// console.log('222222222222222222222')
						if (next>=0)
						{
							next = 0;
							// console.log('333333333333333333333')
							$('#prev-btn').css({'z-index':'-1'})
							$('#next-btn').css({'z-index':'2'})
						}
					}else if(next<0&&next>mswidth*-100){
						$('#prev-btn').css({'z-index':'2'});
						$('#next-btn').css({'z-index':'2'});
					}
				}else if(next>=0){
					// console.log('here = '+move);
					// console.log('44444444444444444444444');
					move=0;
					next=0;
					$('.slide-container').stop().animate({'left':next+'%'},100);
					$('#next-btn').css({'z-index':'2'})
					$('#prev-btn').css({'z-index':'-1'})
					if (next<=0)
					{
						next = 0;
						$('#prev-btn').css({'z-index':'-1'})
						$('#next-btn').css({'z-index':'2'})
						// console.log('5555555555555555555555')
					}
				}
			};

			function prevBtn(){
				move=move+100;
				bi=1+move/100*-1;
				text = Math.floor((move/100)*-1);
				pre = text*-100;
				console.log('prev act = '+pre+' / move = '+move);
				if (pre<100)
				{
					console.log('prev act in1= '+pre+' / move = '+move);
					bc=text+1;
					$('.slide-container').stop().animate({'left':pre+'%'},100);
					$('#next-btn').css({'z-index':'2'})
					$('#prev-btn').css({'z-index':'2'})
					$('.bulet').css({'color':'#ccc'})
					$('#bulet'+bc).css({'color':'#999'})
					if (pre>=0)
					{
						move=100;
						pre = 0;
						$('#next-btn').css({'z-index':'2'})
						$('#prev-btn').css({'z-index':'-1'})
					}else if(pre<0){
						console.log('prev act in deep= '+pre);
						$('#next-btn').css({'z-index':'2'})
						$('#prev-btn').css({'z-index':'2'})
						$('.slide-container').stop().animate({'left':pre+'%'},100);
					}
				}else{
					move=100;
					pre = 0;
					$('.slide-container').stop().animate({'left':pre+'%'},100);
					$('#next-btn').css({'z-index':'2'})
					if (pre<=0)
					{
						pre = 0;
						$('#prev-btn').css({'z-index':'-1'})
					}
				}
			};

			function stop_next(){
				clearTimeout(nextBtn);
			}

			$('#prev-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
				}
				else if (event.type='click')
				{
					prevBtn();
				}
			});

			$('#next-btn').on('mouseover mouseout click',function(){
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}else if (event.type=='mouseout')
				{
					start_s();
					startbar();
				}

				else if (event.type='click')
				{
					nextBtn();
				}

			});

			$('.slide').on('touchstart touchmove touchend touchcancle click mouseover mouseleave',function(event){
				var cal_width = s_width*0.6;
				var cal_height = msheight*0.2;
				var dragmove;

				/*swipe 이벤트 시작*/
				if (event.type=='touchstart')
				{
					event.preventDefault();
					event.stopPropagation();
					tstart=event.originalEvent.touches[0].pageX;
					ystart=event.originalEvent.touches[0].pageY;
					stop_s();
					stop_bar();
				}
				else if (event.type=='touchmove'){
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;

					stop_s();
					stop_bar();
					var tvalue = tstart-tmove;
					var yvalue = ystart-ymove;
					var slideNum;

					if (tstart-tmove<cal_width){

						event.preventDefault();
						event.stopPropagation();

						stop_s();
						stop_bar();

						bi=1+move/100*-1;
						slideNum = $('.slide-container').css('left').replace('px', '');
						mswidth = $('.slide').each(Array).length;
						dragmove = (slideNum/mswidth-(tstart-tmove))/100;

						if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
						{
							if(tstart-tmove>0){
								moveper=move-100/100;
								$('.slide-container').stop().animate({'left':moveper+dragmove+'%'},100);
								// console.log('here left1 = '+move+dragmove);
							}else{
								moveper=move-100/100*-1;
								//move=(move-100)/100;
								$('.slide-container').stop().animate({'left':moveper+dragmove+'%'},100);
								console.log('here left2 = '+move+dragmove+' / moveper = '+moveper+' / dragmove = '+dragmove);
							}

							if (move-100==-mswidth*100)
							{
								move=-mswidth*100;
							}
						}else{
							move=-mswidth*100+100;
						}

					}else if (tstart-tmove<cal_width){

						event.preventDefault();
						event.stopPropagation();

						stop_s();
						stop_bar();

						moveper=move+100;
						if(move>0){
							move=100;
							moveper=move+100;
						}else if(move==0){
							moveper=move+100;
						}else if(move<0){
							moveper=move+100;
						}
						bi=1+move/100*-1;
						slideNum = $('.slide-container').css('left').replace('px', '')%100;

						if (move<100)
						{
							$('.slide-container').stop().animate({'left':moveper-dragmove+'%'},100);
							// console.log('here right = '+dragmove);
							if (move==0)
							{
								$('#prev-btn').css({'z-index':'-1'})
							}
						}else{
							move=100;
							//$('.slide-container').stop().animate({'left':move+'%'},100);
							$('.slide-container').stop().animate({'left':moveper-dragmove+'%'},100);
							$('#next-btn').css({'z-index':'2'})
							// console.log('here right = '+dragmove);
							if (move==0)
							{
								$('#prev-btn').css({'z-index':'-1'})
							}
						}
					}
					start_s();
					startbar();
				}
				else if (event.type=='touchend')
				{
					event.preventDefault();
					event.stopPropagation();
					// tend=event.originalEvent.touches[0].pageX;
					tmove=event.originalEvent.changedTouches[0].pageX;
					ymove=event.originalEvent.changedTouches[0].pageY;
					stop_next();
					stop_s();
					stop_bar();
					var tvalue = tstart-tmove;
					var yvalue = ystart-ymove;
					var slideNum = ($('.slide-container').css('left').replace('px', ''))%100;
					var max_drag = (mswidth-1)*-100;
					dragindex = $('.slide').index(this)*-100;
					if (tvalue>cal_width)
					{
						var tvalue = cal_width;
						if (move<=(mswidth-1)*-100)
						{
							// console.log('im in');
							next=(mswidth-1)*-100;
							bc=((next/100)*-1)+1;
							function move_oevr(){
								setTimeout(stop_next,0);
								setTimeout(stop_next,0);
								setTimeout(stop_s,0);
								move=100;
								if (next>=mswidth*-100)
								{
									event.preventDefault();
									event.stopPropagation();
									move=100;
									setTimeout(stop_next,0);
									setTimeout(stop_s,0);
									setTimeout(stop_bar,0);
									setTimeout(startbar,0);
									$('.slide-container').stop().animate({'left':next+'%'},100);
									if(move==100&&next<-100){
										move=100;
										// console.log('===========reset============1 - '+next);
										event.preventDefault();
										event.stopPropagation();
										setTimeout(stop_next,0);
										setTimeout(stop_s,0);
										setTimeout(stop_bar,0);
										setTimeout(startbar,0);
										setTimeout(start_s,autospeed);
									}
								}
								else{
									move=100;
									setTimeout(stop_next,0);
									setTimeout(stop_s,0);
									setTimeout(stop_bar,0);
									$('.slide-container').stop().animate({'left':next+'%'},100);
									// console.log('===========reset============2')
								}
							};
							setTimeout(move_oevr,0);
							tvalue=0;
							// console.log('bc = '+bc+' / next = '+next+' / move = '+move);
						}
						else{
							$('#next-btn').stop().click();
						}
					}else if (tvalue<-cal_width)
					{
						var tvalue = cal_width;
						//$('#prev-btn').stop().click();
						if (move>0)
						{
							move = 100;
							//next = 0;
							//pre = 0;
							$('.slide-container').stop().animate({'left':dragindex+'%'},100);
							// $('#prev-btn').css({'z-index':'-1'});
							// $('.bulet').css({'color':'#ccc'});
							// $('#bulet1').css({'color':'#999'});
							//setTimeout(startbar,0);
							//setTimeout(start_s,autospeed);
							// console.log(dragindex+' / '+pre);
							console.log('prev-drag = '+dragindex)
						}else{
							// stop_s();
							// stop_bar();
							$('#prev-btn').stop().click();
							// start_s();
							// startbar();
						}
					}else if (tstart-tmove<cal_width){
						dragindex = $('.slide').index(this)*-100;
						$('.slide-container').stop().animate({'left':dragindex+'%'},100);
						next=(mswidth-1)*-100;
						if(next>=mswidth*-100&&move<=max_drag){
							move = 100;
							event.preventDefault();
							event.stopPropagation();
							setTimeout(stop_next,0);
							setTimeout(stop_s,0);
							setTimeout(stop_bar,0);
							setTimeout(startbar,0);
							$('.slide-container').stop().animate({'left':max_drag+'%'},100);
							move=max_drag+100;
							if(move>max_drag){
								move = 100;
								event.preventDefault();
								event.stopPropagation();
								setTimeout(stop_next,0);
								setTimeout(stop_s,0);
								setTimeout(start_s,autospeed);
								// console.log(move);
								if(yvalue==0){
									event.preventDefault();
									event.stopPropagation();
									$('body').css({'background':'purple'})//마지막 순번 click시 조건.
								}else{
									if(yvalue>cal_height){
										$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
									}else if(yvalue<cal_height){
										if((yvalue*-1)>cal_height){
											$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
										}
									}
								}
							}
							// console.log(move);
						}
						if(slideNum==true){
							if(yvalue==0){
								if($(this).is('#slide1')==true){
									$('body').css({'background':'red'})
								}else if($(this).is('#slide2')==true){
									$('body').css({'background':'orange'})
								}else if($(this).is('#slide3')==true){
									$('body').css({'background':'yellow'})
								}else if($(this).is('#slide4')==true){
									$('body').css({'background':'green'})
								}else if($(this).is('#slide5')==true){
									$('body').css({'background':'blue'})
								}else if($(this).is('#slide6')==true){
									$('body').css({'background':'purple'})
								}
							}else{
								if(yvalue>cal_height){
									$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
								}else if(yvalue<cal_height){
									if((yvalue*-1)>cal_height){
										$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
									}
								}
							}
							// console.log('1-1');
						}else{
							mswidth = $('.slide').each(Array).length;
							if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
							{
								// console.log(tstart-tmove);
								move = 100;
								if(tstart-tmove==0){
									if(yvalue==0){
										if($(this).is('#slide1')==true){
											$('body').css({'background':'red'})
										}else if($(this).is('#slide2')==true){
											$('body').css({'background':'orange'})
										}else if($(this).is('#slide3')==true){
											$('body').css({'background':'yellow'})
										}else if($(this).is('#slide4')==true){
											$('body').css({'background':'green'})
										}else if($(this).is('#slide5')==true){
											$('body').css({'background':'blue'})
										}else if($(this).is('#slide6')==true){
											$('body').css({'background':'purple'})
										}
									}else{
										if(yvalue>cal_height){
											$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
										}else if(yvalue<cal_height){
											if((yvalue*-1)>cal_height){
												$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
											}
										}
									}
								}
							}else{
								move=-mswidth*100+100;
							}
						}
					}
					start_s();
					startbar();
				}
				// else if (event.type=='touchcancle')
				// {
				// 	event.preventDefault();
				// 	event.stopPropagation();
				// 	// tend=event.originalEvent.touches[0].pageX;
				// 	tmove=event.originalEvent.changedTouches[0].pageX;
				// 	ymove=event.originalEvent.changedTouches[0].pageY;
				// 	stop_next();
				// 	stop_s();
				// 	stop_bar();
				// 	var tvalue = tstart-tmove;
				// 	var yvalue = ystart-ymove;
				// 	var slideNum = ($('.slide-container').css('left').replace('px', ''))%100;
				// 	var max_drag = (mswidth-1)*-100;
				// 	dragindex = $('.slide').index(this)*-100;
				// 	if (tvalue>cal_width)
				// 	{
				// 		var tvalue = cal_width;
				// 		if (move<=(mswidth-1)*-100)
				// 		{
				// 			// console.log('im in');
				// 			next=(mswidth-1)*-100;
				// 			bc=((next/100)*-1)+1;
				// 			function move_oevr(){
				// 				setTimeout(stop_next,0);
				// 				setTimeout(stop_next,0);
				// 				setTimeout(stop_s,0);
				// 				move=100;
				// 				if (next>=mswidth*-100)
				// 				{
				// 					event.preventDefault();
				// 					event.stopPropagation();
				// 					move=100;
				// 					setTimeout(stop_next,0);
				// 					setTimeout(stop_s,0);
				// 					setTimeout(stop_bar,0);
				// 					setTimeout(startbar,0);
				// 					$('.slide-container').stop().animate({'left':next+'%'},100);
				// 					if(move==100&&next<-100){
				// 						move=100;
				// 						// console.log('===========reset============1 - '+next);
				// 						event.preventDefault();
				// 						event.stopPropagation();
				// 						setTimeout(stop_next,0);
				// 						setTimeout(stop_s,0);
				// 						setTimeout(stop_bar,0);
				// 						setTimeout(startbar,0);
				// 						setTimeout(start_s,autospeed);
				// 					}
				// 				}
				// 				else{
				// 					move=100;
				// 					setTimeout(stop_next,0);
				// 					setTimeout(stop_s,0);
				// 					setTimeout(stop_bar,0);
				// 					$('.slide-container').stop().animate({'left':next+'%'},100);
				// 					// console.log('===========reset============2')
				// 				}
				// 			};
				// 			setTimeout(move_oevr,0);
				// 			tvalue=0;
				// 			// console.log('bc = '+bc+' / next = '+next+' / move = '+move);
				// 		}
				// 		else{
				// 			$('#next-btn').stop().click();
				// 		}
				// 	}else if (tvalue<-cal_width)
				// 	{
				// 		var tvalue = cal_width;
				// 		$('#prev-btn').stop().click();
				// 		if (move>0)
				// 		{
				// 			move = 0;
				// 			next = 0;
				// 			$('.slide-container').stop().animate({'left':pre+'%'},100);
				// 			$('#prev-btn').css({'z-index':'-1'});
				// 			$('.bulet').css({'color':'#ccc'});
				// 			$('#bulet1').css({'color':'#999'});
				// 			//setTimeout(startbar,0);
				// 			//setTimeout(start_s,autospeed);
				// 			// console.log(dragindex+' / '+pre);
				// 		}
				// 	}else if (tstart-tmove<cal_width){
				// 		dragindex = $('.slide').index(this)*-100;
				// 		$('.slide-container').stop().animate({'left':dragindex+'%'},100);
				// 		next=(mswidth-1)*-100;
				// 		if(next>=mswidth*-100&&move<=max_drag){
				// 			move = 100;
				// 			event.preventDefault();
				// 			event.stopPropagation();
				// 			setTimeout(stop_next,0);
				// 			setTimeout(stop_s,0);
				// 			setTimeout(stop_bar,0);
				// 			setTimeout(startbar,0);
				// 			$('.slide-container').stop().animate({'left':max_drag+'%'},100);
				// 			move=max_drag+100;
				// 			if(move>max_drag){
				// 				move = 100;
				// 				event.preventDefault();
				// 				event.stopPropagation();
				// 				setTimeout(stop_next,0);
				// 				setTimeout(stop_s,0);
				// 				setTimeout(start_s,autospeed);
				// 				// console.log(move);
				// 				if(yvalue==0){
				// 					event.preventDefault();
				// 					event.stopPropagation();
				// 					$('body').css({'background':'purple'})//마지막 순번 click시 조건.
				// 				}else{
				// 					if(yvalue>cal_height){
				// 						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 					}else if(yvalue<cal_height){
				// 						if((yvalue*-1)>cal_height){
				// 							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 						}
				// 					}
				// 				}
				// 			}
				// 			// console.log(move);
				// 		}
				// 		if(slideNum==true){
				// 			if(yvalue==0){
				// 				if($(this).is('#slide1')==true){
				// 					$('body').css({'background':'red'})
				// 				}else if($(this).is('#slide2')==true){
				// 					$('body').css({'background':'orange'})
				// 				}else if($(this).is('#slide3')==true){
				// 					$('body').css({'background':'yellow'})
				// 				}else if($(this).is('#slide4')==true){
				// 					$('body').css({'background':'green'})
				// 				}else if($(this).is('#slide5')==true){
				// 					$('body').css({'background':'blue'})
				// 				}else if($(this).is('#slide6')==true){
				// 					$('body').css({'background':'purple'})
				// 				}
				// 			}else{
				// 				if(yvalue>cal_height){
				// 					$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 				}else if(yvalue<cal_height){
				// 					if((yvalue*-1)>cal_height){
				// 						$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 					}
				// 				}
				// 			}
				// 			// console.log('1-1');
				// 		}else{
				// 			mswidth = $('.slide').each(Array).length;
				// 			if (move>mswidth*-100)/*슬라이드 갯수 최대치 자동 연산*/
				// 			{
				// 				// console.log(tstart-tmove);
				// 				move = 100;
				// 				if(tstart-tmove==0){
				// 					if(yvalue==0){
				// 						if($(this).is('#slide1')==true){
				// 							$('body').css({'background':'red'})
				// 						}else if($(this).is('#slide2')==true){
				// 							$('body').css({'background':'orange'})
				// 						}else if($(this).is('#slide3')==true){
				// 							$('body').css({'background':'yellow'})
				// 						}else if($(this).is('#slide4')==true){
				// 							$('body').css({'background':'green'})
				// 						}else if($(this).is('#slide5')==true){
				// 							$('body').css({'background':'blue'})
				// 						}else if($(this).is('#slide6')==true){
				// 							$('body').css({'background':'purple'})
				// 						}
				// 					}else{
				// 						if(yvalue>cal_height){
				// 							$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 						}else if(yvalue<cal_height){
				// 							if((yvalue*-1)>cal_height){
				// 								$('body, html').stop().animate({ scrollTop: $("body").offset().top+yvalue },300);
				// 							}
				// 						}
				// 					}
				// 				}
				// 			}else{
				// 				move=-mswidth*100+100;
				// 			}
				// 		}
				// 	}
				// 	start_s();
				// 	startbar();
				// 	// console.log('cancle_1');
				// }
				else if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}
				else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
				}
				return false;
			});

			var cb;
			var cbm;
			function bullet_next(){
				setTimeout(nextBtn,autospeed);
			}
			$('.bulet').on('click mouseover mouseleave touchstart touchmove touchend touchcancle',function(){
				if (event.type=='click')
				{
					for (cb = $('.bulet').each(Array).length;cb>=1;cb-- )
					{
						if ($(this).attr('id')=='bulet'+cb)
						{
							$('.bulet').css({'color':'#ccc'})
							$(this).css({'color':'#999'})
							cbm = cb*100;
							if (move-cbm<0)
							{
								if (move-cbm<-100)
								{
									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100)

									if (cb==1)
									{
										$('#prev-btn').css({'z-index':'-1'})
										$('#next-btn').css({'z-index':'2'})

									}else if ((cb!==1)&&(cb!==mswidth))
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'2'})
									}else if (cb==mswidth)
									{
										bullet_next();
										stop_next();
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'-1'})
									}
								}else if (move-cbm>-100){
									$('.slide-container').stop().animate({'left':0+'%'},100);
									$('#prev-btn').css({'z-index':'-1'})
									$('#next-btn').css({'z-index':'2'})
								}else if (move-cbm==-100)
								{
									$('.slide-container').stop().animate({'left':-cbm+100+'%'},100);
									if (cb==1)
									{
										$('#prev-btn').css({'z-index':'-1'})
										$('#next-btn').css({'z-index':'2'})

									}else if ((cb!==1)&&(cb!==mswidth))
									{
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'2'})
									}else if (cb==mswidth)
									{
										bullet_next();
										stop_next();
										$('#prev-btn').css({'z-index':'2'})
										$('#next-btn').css({'z-index':'-1'})
									}
								}
							}
						}
					}
					move=-cbm+100;
				}
				if (event.type=='mouseover')
				{
					stop_s();
					stop_bar();
				}else if (event.type=='mouseleave')
				{
					start_s();
					startbar();
				}
				else if (event.type=='touchstart'){
					stop_s();
					stop_bar();
					if((move-100==mswidth*-100)||(move-100<mswidth*-100)){
						move=100;
					}
				}
				else if (event.type=='touchmove'){
					stop_s();
					setTimeout(stop_bar,0);
					if((move-100==mswidth*-100)||(move-100<mswidth*-100)){
						move=100;
					}
					setTimeout(start_s,0);
					setTimeout(startbar,0);
				}
				else if (event.type=='touchend'){
					stop_s();
					setTimeout(stop_bar,0);
					if((move-100==mswidth*-100)||(move-100<mswidth*-100)){
						move=100;
					}
					setTimeout(start_s,0);
					setTimeout(startbar,0);
				}
				else if (event.type=='touchcancle'){
					stop_s();
					setTimeout(stop_bar,0);
					if((move-100==mswidth*-100)||(move-100<mswidth*-100)){
						move=100;
					}
					setTimeout(start_s,0);
					setTimeout(startbar,0);
				}
			});

			if ((move==0)||(cb==1))
			{
				$('#prev-btn').css({'z-index':'-1'})
				$('#next-btn').css({'z-index':'2'})
				$('.bulet').css({'color':'#ccc'})
				$('#bulet1').css({'color':'#999'})
			}else if ((cb!==1)&&(cb!==mswidth))
			{
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'2'})
			}else if (cb==mswidth)
			{
				$('#prev-btn').css({'z-index':'2'})
				$('#next-btn').css({'z-index':'-1'})
			};

			function lazy_0(){
				if($('.slide-wrap').height()==0){
					$(document).ready(function(){
							msheight = $('.slide').children('img').height();
							$('.slide-wrap').css({'height':msheight});
							// console.log(msheight+' --')
						}
					);
				};
			}
			function startbar(){
				setTimeout(lazy_0,0);
				$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
				$('.timebar').stop().animate({'width':'100%'},barspeed);
				bar = setInterval(function(){
						$('.timebar').remove();
						$('.slide-wrap').append('<span class="timebar" style="display:inline-block;position:absolute;bottom:0px;left:0;width:0;height:20px;background:rgba(0,0,0,0.7);z-index:1"></span>')
						$('.timebar').stop().animate({'width':'100%'},barspeed);
				},autospeed);
			};
			function start_s(){
				stop_next();
				setTimeout(lazy_0,0);
				interval = setInterval(function(){
					if($('.slide-wrap').height()==0){
						$(document).ready(function(){
							msheight = $('.slide img').height();
							$('.slide-wrap').css({'height':msheight});
						});
					}
					nextBtn();
				},autospeed);
			}
			start_s();
			startbar();
			function stop_s(){
				clearInterval(interval);
			}
			function stop_bar(){
				$('.timebar').remove();
				clearInterval(bar);
			}
		});
	};
	//--이미지 로드와의 시간차로 height가 느리게 잡히는 것을 강제로 끌어내어 처음부터 height값 강제 적용.
	function lazy_0(){
		if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
			$(document).ready(function(){
					msheight = $('.slide').children('img').height();
					$('.slide-wrap').css({'height':msheight});
					//// console.log(msheight+' --');
				}
			);
			//// console.log('++');
		};
	}
	if($('.slide-wrap').height()==0||$('.slide-wrap').height()==null){
		setInterval(lazy_0,-100);
		//// console.log('==');
	};
	//-----
	return false;
});
