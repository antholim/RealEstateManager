package www.antholim.co.Backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http
                .requiresChannel(channel -> channel.anyRequest())//enforce https
                .authorizeHttpRequests(authz -> authz
//                        .requestMatchers("/api-docs").permitAll()
//                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/api/v1/register").permitAll()
                        .requestMatchers("/api/v1/login").permitAll()
                        .requestMatchers("/api/v1/hello-world").permitAll()
                        .anyRequest().authenticated()
                )
//                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
//                .authenticationProvider(authenticationProvider)
//                .addFilterBefore(hostCheckFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(jwAuthenFilter, UsernamePasswordAuthenticationFilter.class)
                .csrf().disable()
                .build();
    }
}
